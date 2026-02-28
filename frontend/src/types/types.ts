export interface Topic {
  topic_id: number;
  name: string;
  content: string;
  start_time: number;
  end_time: number;
}

export interface Topic {
  topic_id: number;
  name: string;
  content: string;
  start_time: number;
  end_time: number;
}

export interface ActionItem {
  text: string;
  assignee?: string;
  type?: 'action' | 'decision';
}

export interface QAPair {
  question: string;
  answer: string;
}

export interface ProcessResult {
  job_id: string;
  summary_short: string;
  summary_detailed: string;
  topics: Topic[];
  action_items: ActionItem[];
  decisions: string[];
  qa_pairs: QAPair[];
}

export interface JobStatus {
  job_id: string;
  status: 'queued' | 'downloading' | 'transcribing' | 'summarizing' | 'completed' | 'failed';
  progress: number;
  error_message?: string;
}
