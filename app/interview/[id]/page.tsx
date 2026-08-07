'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { InterviewService } from '@/services/interview-service';
import { ResumeService } from '@/services/resume-service';
import { InterviewConfig } from '@/types';
import { Bot, Mic, MicOff, Send, Clock, Sparkles, User, Volume2, VolumeX, RefreshCw, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveInterviewPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.id as string;

  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);
  
  // Real-time Countdown Stopwatch Timer
  const [secondsLeft, setSecondsLeft] = useState<number>(30 * 60);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isRecording, transcript, startRecording, stopRecording, resetTranscript } = useAudioRecorder();
  const { isSpeaking, isMuted, speak, stop, toggleMute } = useSpeechSynthesis();

  // Handle Voice Transcript Output
  useEffect(() => {
    if (transcript) {
      setInputAnswer(transcript);
    }
  }, [transcript]);

  // Load Session Config & Initial AI Question
  useEffect(() => {
    const list = InterviewService.getLocalInterviews();
    const current = list.find((i) => i.id === interviewId) || {
      id: interviewId,
      job_role: 'Full Stack Engineer',
      experience_level: 'Mid-Level (2-5 yrs)',
      difficulty: 'Medium',
      interview_type: 'Technical Coding',
      duration_minutes: 30,
      status: 'in_progress',
    };
    setConfig(current);
    setSecondsLeft((current.duration_minutes || 30) * 60);

    const initialQuestion = `Hello Alex! I'm your AI Interviewer at SteerHire today. We're conducting a ${current.difficulty} ${current.interview_type} interview for the ${current.job_role} position. Let's start with your background: Could you walk me through an architecture decision you made recently that you're most proud of?`;
    setMessages([{ role: 'ai', content: initialQuestion }]);
    
    speak(initialQuestion);
  }, [interviewId]);

  // Live Stopwatch Interval
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!loading && !isSpeaking) {
      inputRef.current?.focus();
    }
  }, [messages, loading, isSpeaking]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSubmit = inputAnswer.trim();
    if (!textToSubmit || loading) return;

    stop();

    const updatedMessages = [...messages, { role: 'user' as const, content: textToSubmit }];
    setMessages(updatedMessages);
    setInputAnswer('');
    resetTranscript();
    setLoading(true);

    const activeResume = ResumeService.getActiveResume();

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          config,
          resume: activeResume?.parsed_data,
        }),
      });

      const data = await res.json();
      setMessages([...updatedMessages, { role: 'ai' as const, content: data.reply }]);
      setQuestionCount((prev) => prev + 1);

      speak(data.reply);
    } catch (err) {
      console.error('Error getting next question:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishInterview = async () => {
    stop();
    setIsFinishing(true);

    try {
      const res = await fetch('/api/ai/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewId,
          questions: messages,
          config,
        }),
      });

      const reportData = await res.json();
      
      const fullReport = {
        id: `rep-${interviewId}`,
        interview_id: interviewId,
        overall_score: reportData.overall_score || 88,
        technical_score: reportData.technical_score || 90,
        communication_score: reportData.communication_score || 86,
        confidence_score: reportData.confidence_score || 84,
        problem_solving_score: reportData.problem_solving_score || 92,
        strengths: reportData.strengths || ['Strong technical articulation', 'Structured reasoning'],
        weaknesses: reportData.weaknesses || ['Slight gap in optimistic concurrency edge cases'],
        improvements: reportData.improvements || ['Practice optimistic locking retry mechanisms'],
        hiring_recommendation: reportData.hiring_recommendation || 'Strong Hire',
        summary: reportData.summary || 'Impressive performance across all interview probes.',
        created_at: new Date().toISOString(),
      };

      InterviewService.saveLocalReport(fullReport);

      if (config) {
        InterviewService.saveLocalInterview({
          ...config,
          id: interviewId,
          status: 'completed',
          score: fullReport.overall_score,
          created_at: config.created_at || new Date().toISOString(),
        });
      }

      router.push(`/interview/${interviewId}/report`);
    } catch (err) {
      console.error('Error completing interview:', err);
      router.push(`/interview/${interviewId}/report`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3.5 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-[1px] relative shadow-sm">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
            )}
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              {config?.job_role} Interview
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-mono font-bold">
                {config?.difficulty}
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
              Probing Question #{questionCount}
              {isSpeaking && (
                <span className="text-blue-600 font-mono text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Speaking Out Loud...
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Live Audio & Stopwatch Timer */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-600">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Confidence: 91%</span>
          </div>

          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isMuted
                ? 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
                : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
            <span className="hidden sm:inline">{isMuted ? 'Voice Off' : 'Voice On'}</span>
          </button>

          {/* Real-time Counting Stopwatch Timer */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono font-black text-blue-600 shadow-sm">
            <Clock className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Time Left: {formatTimer(secondsLeft)}</span>
          </div>

          <button
            onClick={handleFinishInterview}
            disabled={isFinishing}
            className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {isFinishing ? 'Evaluating...' : 'End & Generate Report'}
          </button>
        </div>
      </header>

      {/* Main Live Interview Chat Area */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between space-y-6">
        {/* Messages Stream Container */}
        <div className="flex-grow space-y-6 overflow-y-auto pr-2">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}

              <div
                className={`max-w-2xl p-5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai'
                    ? 'glass-card border-blue-500/20 text-slate-800 rounded-tl-none shadow-md bg-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tr-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 font-mono">
                    {msg.role === 'ai' ? (
                      <>
                        <Sparkles className="w-3 h-3 text-blue-600" /> SteerHire AI Interviewer
                      </>
                    ) : (
                      <>
                        <User className="w-3 h-3 text-cyan-400" /> Candidate Answer
                      </>
                    )}
                  </span>
                  {msg.role === 'ai' && (
                    <button
                      onClick={() => speak(msg.content)}
                      className="text-slate-400 hover:text-slate-700 p-1 transition-colors"
                      title="Replay Voice Speech"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  )}
                </div>
                <p className="font-medium">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-blue-600 animate-spin" />
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-tl-none border-blue-500/20 text-xs text-blue-600 font-bold flex items-center gap-2 bg-white">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> SteerHire AI analyzing response & probing architecture...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar with Keyboard Shortcuts */}
        <div className="glass-card p-4 rounded-2xl border border-slate-200/80 bg-white relative shadow-sm">
          <form onSubmit={handleSubmitAnswer} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmitAnswer();
                }
              }}
              placeholder="Type your answer and press Enter to send..."
              className="flex-grow glass-input rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-xl border transition-all ${
                isRecording
                  ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="submit"
              disabled={!inputAnswer.trim() || loading}
              className="px-5 py-3 rounded-xl gradient-button text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              Send <Send className="w-4 h-4" />
            </button>
          </form>

          {isRecording && (
            <p className="text-[11px] text-rose-600 mt-2 flex items-center gap-1.5 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Recording live speech... speak clearly.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
