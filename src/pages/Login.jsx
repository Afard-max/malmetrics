import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react'; // <-- Se eliminó el ícono 'Activity'
import styled from 'styled-components';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';

// --- COMPONENTE DE TARJETA SEPARADA ---
const GlassInput = ({ label, placeholder, description, type, value, onChange, required }) => (
  <StyledInputWrapper>
    <div className="input__container">
      <label className="input__label">{label}</label>
      <input 
        placeholder={placeholder} 
        className="input" 
        type={type} 
        value={value}
        onChange={onChange}
        required={required}
      />
      <p className="input__description">{description}</p>
    </div>
  </StyledInputWrapper>
);

const StyledInputWrapper = styled.div`
  width: 100%;

  .input__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: rgba(255, 255, 255, 0.3);
    padding: 15px;
    border-radius: 20px;
    position: relative;
  }

  .input__container::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(25px);
    border-radius: 20px;
    background-color: #e499ff;
    background-image: radial-gradient(at 47% 69%, hsla(17,62%,65%,1) 0px, transparent 50%),
                      radial-gradient(at 9% 32%, hsla(222,75%,60%,1) 0px, transparent 50%);
  }

  .input__label {
    display: block;
    margin-left: 0.4em;
    color: #000;
    text-transform: uppercase;
    font-size: 0.9em;
    font-weight: bold;
  }

  .input__description {
    font-size: 0.6em;
    font-weight: bold;
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
  }

  .input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0.6em;
    padding-left: 0.9em;
    border-radius: 20px;
    background: #fff;
    color: #000;
    transition: background 300ms, color 300ms;
  }

  .input:hover, .input:focus {
    background: rgb(0, 0, 0);
    color: #fff;
  }
`;

// --- COMPONENTE PRINCIPAL ---
export const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && clientId.trim()) {
      localStorage.setItem('mal_username', username.trim());
      localStorage.setItem('mal_client_id', clientId.trim());
      onLogin(); 
    }
  };

  return (
    // Agregamos overflow-y-auto y py-12 para garantizar que nunca se corte en pantallas pequeñas
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto py-12 transition-colors duration-300">
      
      <AnimatedBackground />

      <div className="absolute right-6 top-6 z-10 flex items-center gap-4">
        <LanguageSelector />
      </div>

      <div className="z-10 w-full max-w-sm p-6">
        {/* Contenedor del título ajustado sin el ícono */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="text-5xl font-black tracking-tight text-[#F1F5F9] drop-shadow-lg">malmetrics</h1>
          <p className="mt-3 text-sm font-medium text-[#94A3B8]">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
          <GlassInput 
            label={t('login.username_label')}
            placeholder={t('login.username_placeholder')}
            description={t('login.username_desc', 'What do you want to call yourself?')}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <GlassInput 
            label={t('login.client_id_label')}
            placeholder={t('login.client_id_placeholder')}
            description={t('login.client_id_desc', 'Your secret API connection string')}
            type="password"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          />

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          >
            {t('login.submit')}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-2 text-center text-sm">
          <span className="font-medium text-[#94A3B8]">{t('login.help_text')}</span>
          <a
            href="https://Afard-max.github.io/malmetrics-docs/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-bold text-[#06B6D4] transition-colors hover:text-[#7C3AED] hover:underline"
          >
            <ExternalLink size={14} />
            {t('login.help_link')}
          </a>
        </div>
      </div>
    </div>
  );
};