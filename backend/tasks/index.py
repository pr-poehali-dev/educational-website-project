'''
Business: API для управления задачами - получение, создание и обновление задач
Args: event с httpMethod, body, queryStringParameters
Returns: HTTP response с данными задач
'''

import json
import os
from typing import Dict, Any, List, Optional
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
            grade = params.get('grade')
            subject = params.get('subject')
            chapter_id = params.get('chapter_id')
            
            query = 'SELECT * FROM tasks WHERE 1=1'
            query_params = []
            
            if grade:
                query += ' AND grade = %s'
                query_params.append(int(grade))
            
            if subject:
                query += ' AND subject = %s'
                query_params.append(subject)
            
            if chapter_id:
                query += ' AND chapter_id = %s'
                query_params.append(int(chapter_id))
            
            query += ' ORDER BY chapter_id, id'
            
            cursor.execute(query, query_params)
            tasks = cursor.fetchall()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'tasks': tasks}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            query = '''
                INSERT INTO tasks (grade, subject, chapter_id, chapter_title, title, description, difficulty, points, external_link, created_by)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, grade, subject, chapter_id, chapter_title, title, description, difficulty, points, external_link, created_at
            '''
            
            cursor.execute(query, (
                body_data.get('grade'),
                body_data.get('subject'),
                body_data.get('chapter_id'),
                body_data.get('chapter_title'),
                body_data.get('title'),
                body_data.get('description'),
                body_data.get('difficulty', 'medium'),
                body_data.get('points', 10),
                body_data.get('external_link'),
                body_data.get('created_by')
            ))
            
            new_task = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'task': new_task}, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            task_id = body_data.get('id')
            
            if not task_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Task ID is required'}),
                    'isBase64Encoded': False
                }
            
            query = '''
                UPDATE tasks 
                SET title = %s, description = %s, difficulty = %s, points = %s, external_link = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, grade, subject, chapter_id, chapter_title, title, description, difficulty, points, external_link, updated_at
            '''
            
            cursor.execute(query, (
                body_data.get('title'),
                body_data.get('description'),
                body_data.get('difficulty'),
                body_data.get('points'),
                body_data.get('external_link'),
                task_id
            ))
            
            updated_task = cursor.fetchone()
            conn.commit()
            
            cursor.close()
            conn.close()
            
            if updated_task:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'task': updated_task}, default=str),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Task not found'}),
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
