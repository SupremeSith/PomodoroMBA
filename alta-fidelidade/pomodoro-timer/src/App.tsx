import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [time, setTime] = useState(10 * 60 + 5); // 19:15 em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('Foco'); 
  const [tasks, setTasks] = useState<string[]>([
  ]);
  const [newTask, setNewTask] = useState('');

  // Lógica do timer------------------------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  // Formata o tempo em MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Alterna entre modos e redefine o tempo
  const toggleMode = (newMode: string, duration: number) => {
    setMode(newMode);
    setTime(duration);
    setIsRunning(false);
  };

  // Adiciona nova tarefa
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Calcula a porcentagem para o círculo de progresso
  const initialTime = mode === 'Foco' ? 25 * 60 : 15 * 60;
  const progress = ((initialTime - time) / initialTime) * 100;


  // Estilo do círculo de progresso----------------
  return (
    <div className="app">
      <h1>POMODORO</h1>
      

      <div className="container">
        {/* Dados da Sessão */}
        <div className="session-data">
          <h3>Dados da sessão</h3>
          <p><strong>FOCO:</strong> 25 Minutos sem Interrupções</p>
          <p><strong>INTERVALO:</strong> 5 Minutos de Pausa</p>

          <div className="modes">
            <button
              className={`mode-button ${mode === 'Foco' ? 'active' : ''}`}
              onClick={() => toggleMode('Foco', 25 * 60)}
            >
              Foco
            </button>
            <button
              className={`mode-button ${mode === 'Pausa Longa' ? 'active' : ''}`}
              onClick={() => toggleMode('Pausa Longa', 5 * 60)}
            >
              Pausa Longa
            </button>
          </div>

          <div className="timer">
            <svg className="progress-ring" width="200" height="200">
              <circle
                className="progress-ring-circle"
                stroke="#00ff00"
                strokeWidth="10"
                fill="transparent"
                r="95"
                cx="100"
                cy="100"
                style={{
                  strokeDasharray: 565.5, // Circunferência do círculo (2 * π * raio)
                  strokeDashoffset: 565.5 * (1 - progress / 100),
                }}
              />
            </svg>
            <span className="time">{formatTime(time)}</span>
          </div>
        </div>

        {/* Lista de Tarefas */}
        <div className="task-list">
          <h3>Lista de tarefas</h3>
          <p>Após o fim da sessão, atualize  as tarefas</p>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <input type="checkbox" />
                {task}
              </li>
            ))}
          </ul>

          <div className="add-task">
            <input
              type="text"
              placeholder="Nova tarefa..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Adicionar</button>
          </div>
        </div>
      </div>

      <button
        className="start-pause-button"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? 'Pausar' : 'Iniciar'}
      </button>
    </div>
  );
};

export default App;