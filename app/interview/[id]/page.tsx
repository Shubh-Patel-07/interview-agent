'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { InterviewService } from '@/services/interview-service';
import { ResumeService } from '@/services/resume-service';
import { InterviewConfig } from '@/types';
import { Bot, Mic, MicOff, Send, Clock, Sparkles, User, Volume2, VolumeX, RefreshCw } from 'lucide-react';

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
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { isRecording, transcript, startRecording, stopRecording, resetTranscript } = useAudioRecorder();
  const { isSpeaking, isMuted, speak, stop, toggleMute } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript) {
      setInputAnswer(transcript);
    }
  }, [transcript]);

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

    // Initial greeting question from AI Interviewer
    const initialQuestion = `Hello Alex! I'm your AI Interviewer today. We're conducting a ${current.difficulty} ${current.interview_type} interview for the ${current.job_role} position. Let's start with your background: Could you walk me through an architecture decision you made recently that you're most proud of?`;
    setMessages([{ role: 'ai', content: initialQuestion }]);
    
    // Auto speak initial question
    speak(initialQuestion);
  }, [interviewId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmitAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSubmit = inputAnswer.trim();
    if (!textToSubmit || loading) return;

    // Stop speaking if candidate submits
    stop();

    // Append user response
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

      // Auto speak new AI interviewer question
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
    <div className="min-h-screen flex flex-col bg-[#05070d] text-slate-100">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#05070d]/90 backdrop-blur-md border-b border-white/10 py-3.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center relative">
            <Bot className="w-4 h-4 text-purple-400" />
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            )}
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {config?.job_role} Interview
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {config?.difficulty}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              Probing Question #{questionCount}
              {isSpeaking && (
                <span className="text-cyan-400 font-mono text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Speaking Out Loud...
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute/Unmute Voice Audio Output */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isMuted
                ? 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
            }`}
            title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Voice Off' : 'Voice On'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Time Left: {config?.duration_minutes || 30}:00</span>
          </div>

          <button
            onClick={handleFinishInterview}
            disabled={isFinishing}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
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
            <div
              key={index}
              className={`flex gap-3 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
              )}

              <div
                className={`max-w-2xl p-5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai'
                    ? 'glass-card border-purple-500/20 text-slate-200 rounded-tl-none shadow-lg'
                    : 'bg-slate-800/90 border border-white/10 text-slate-100 rounded-tr-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    {msg.role === 'ai' ? (
                      <>
                        <Sparkles className="w-3 h-3 text-purple-400" /> AI Interviewer
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
                      className="text-slate-400 hover:text-white p-1 transition-colors"
                      title="Replay Voice Speech"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    </button>
                  )}
                </div>
                <p>{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-purple-400 animate-spin" />
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-tl-none border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Analyzing response & generating adaptive follow-up...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar with Speech-to-Text */}
        <div className="glass-card p-4 rounded-2xl border border-white/10 relative">
          <form onSubmit={handleSubmitAnswer} className="flex items-center gap-3">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Type your answer or click mic to speak..."
              className="flex-grow glass-input rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500"
            />

            {/* Speech to Text Toggle */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-xl border transition-all ${
                isRecording
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-slate-800 border-white/10 text-slate-300 hover:text-white'
              }`}
              title={isRecording ? 'Stop Recording' : 'Start Voice Input'}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!inputAnswer.trim() || loading}
              className="px-5 py-3 rounded-xl gradient-button text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
            >
              Send <Send className="w-4 h-4" />
            </button>
          </form>

          {isRecording && (
            <p className="text-[11px] text-rose-400 mt-2 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              Recording live speech... speak clearly.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
