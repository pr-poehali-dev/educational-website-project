const API_BASE = {
  tasks: 'https://functions.poehali.dev/282a8b19-c7ee-4f4b-a313-b297a0be3573',
  auth: 'https://functions.poehali.dev/66c969fb-1c90-4df9-a551-1eceb9fbb1ea',
  solutions: 'https://functions.poehali.dev/ffe0152c-4f0d-42c7-8bda-af0b9c2ad4ae',
};

export interface Task {
  id: number;
  grade: number;
  subject: string;
  chapter_id: number;
  chapter_title: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  external_link?: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  role: 'teacher' | 'student';
  full_name?: string;
  created_at: string;
}

export interface Solution {
  id: number;
  student_id: number;
  task_id: number;
  solution_text?: string;
  is_correct?: boolean;
  points_earned: number;
  teacher_comment?: string;
  submitted_at: string;
  checked_at?: string;
}

export const api = {
  tasks: {
    getAll: async (params?: { grade?: number; subject?: string; chapter_id?: number }): Promise<Task[]> => {
      const queryParams = new URLSearchParams();
      if (params?.grade) queryParams.append('grade', params.grade.toString());
      if (params?.subject) queryParams.append('subject', params.subject);
      if (params?.chapter_id) queryParams.append('chapter_id', params.chapter_id.toString());
      
      const url = `${API_BASE.tasks}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.tasks || [];
    },
    
    create: async (task: Partial<Task>): Promise<Task> => {
      const response = await fetch(API_BASE.tasks, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data.task;
    },
    
    update: async (task: Partial<Task>): Promise<Task> => {
      const response = await fetch(API_BASE.tasks, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data.task;
    },
  },
  
  auth: {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      const response = await fetch(API_BASE.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      return await response.json();
    },
    
    register: async (email: string, password: string, role: 'teacher' | 'student', full_name?: string): Promise<{ user: User; token: string }> => {
      const response = await fetch(API_BASE.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', email, password, role, full_name }),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      return await response.json();
    },
  },
  
  solutions: {
    getByStudent: async (studentId: number): Promise<Solution[]> => {
      const response = await fetch(`${API_BASE.solutions}?student_id=${studentId}`);
      const data = await response.json();
      return data.solutions || [];
    },
    
    getByTask: async (taskId: number): Promise<Solution[]> => {
      const response = await fetch(`${API_BASE.solutions}?task_id=${taskId}`);
      const data = await response.json();
      return data.solutions || [];
    },
    
    submit: async (studentId: number, taskId: number, solutionText: string): Promise<Solution> => {
      const response = await fetch(API_BASE.solutions, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, task_id: taskId, solution_text: solutionText }),
      });
      const data = await response.json();
      return data.solution;
    },
    
    check: async (solutionId: number, isCorrect: boolean, pointsEarned: number, teacherComment: string, checkedBy: number): Promise<Solution> => {
      const response = await fetch(API_BASE.solutions, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: solutionId, 
          is_correct: isCorrect, 
          points_earned: pointsEarned, 
          teacher_comment: teacherComment,
          checked_by: checkedBy 
        }),
      });
      const data = await response.json();
      return data.solution;
    },
  },
};
