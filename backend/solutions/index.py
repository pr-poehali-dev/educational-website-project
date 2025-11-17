'''
Business: Управление решениями учеников - отправка, проверка и получение результатов
Args: event с httpMethod, body, queryStringParameters
Returns: HTTP response с данными решений
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            student_id = params.get('student_id')
            task_id = params.get('task_id')
            
            if student_id:
                query = '''
                    SELECT s.*, t.title as task_title, t.grade, t.subject, t.chapter_title
                    FROM student_solutions s
                    JOIN tasks t ON s.task_id = t.id
                    WHERE s.student_id = %s
                    ORDER BY s.submitted_at DESC
                '''
                cursor.execute(query, (int(student_id),))
            elif task_id:
                query = '''
                    SELECT s.*, u.email as student_email, u.full_name
                    FROM student_solutions s
                    JOIN users u ON s.student_id = u.id
                    WHERE s.task_id = %s
                    ORDER BY s.submitted_at DESC
                '''
                cursor.execute(query, (int(task_id),))
            else:
                query = '''
                    SELECT s.*, t.title as task_title, u.email as student_email
                    FROM student_solutions s
                    JOIN tasks t ON s.task_id = t.id
                    JOIN users u ON s.student_id = u.id
                    ORDER BY s.submitted_at DESC
                    LIMIT 100
                '''
                cursor.execute(query)
            
            solutions = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'solutions': solutions}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            query = '''
                INSERT INTO student_solutions (student_id, task_id, solution_text)
                VALUES (%s, %s, %s)
                RETURNING id, student_id, task_id, solution_text, submitted_at
            '''
            
            cursor.execute(query, (
                body_data.get('student_id'),
                body_data.get('task_id'),
                body_data.get('solution_text')
            ))
            
            new_solution = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'solution': new_solution}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            solution_id = body_data.get('id')
            
            query = '''
                UPDATE student_solutions
                SET is_correct = %s, points_earned = %s, teacher_comment = %s, checked_at = CURRENT_TIMESTAMP, checked_by = %s
                WHERE id = %s
                RETURNING id, student_id, task_id, is_correct, points_earned, teacher_comment, checked_at
            '''
            
            cursor.execute(query, (
                body_data.get('is_correct'),
                body_data.get('points_earned'),
                body_data.get('teacher_comment'),
                body_data.get('checked_by'),
                solution_id
            ))
            
            updated_solution = cursor.fetchone()
            conn.commit()
            
            if updated_solution and body_data.get('is_correct'):
                update_progress_query = '''
                    INSERT INTO student_progress (student_id, grade, subject, chapter_id, tasks_completed, total_points, last_activity)
                    SELECT s.student_id, t.grade, t.subject, t.chapter_id, 1, %s, CURRENT_TIMESTAMP
                    FROM student_solutions s
                    JOIN tasks t ON s.task_id = t.id
                    WHERE s.id = %s
                    ON CONFLICT (student_id, grade, subject, chapter_id)
                    DO UPDATE SET 
                        tasks_completed = student_progress.tasks_completed + 1,
                        total_points = student_progress.total_points + %s,
                        last_activity = CURRENT_TIMESTAMP
                '''
                cursor.execute(update_progress_query, (
                    body_data.get('points_earned', 0),
                    solution_id,
                    body_data.get('points_earned', 0)
                ))
                conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'solution': updated_solution}, default=str),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
