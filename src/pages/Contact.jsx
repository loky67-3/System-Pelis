import React, { useState } from 'react';

// Componente para el acordeón de preguntas frecuentes
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #333', marginBottom: '10px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: '#303030',
          border: 'none',
          padding: '25px',
          textAlign: 'left',
          color: '#fff',
          fontSize: '22px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {title}
        <span style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s', fontSize: '40px', fontWeight: 'lighter' }}>+</span>
      </button>
      {isOpen && (
        <div style={{ background: '#303030', padding: '25px', marginTop: '2px', fontSize: '18px', lineHeight: '1.6' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default function Contact() {
  const faqs = [
    {
      question: '¿Qué es Syspelis?',
      answer: 'Syspelis es una aplicación web moderna desarrollada para la gestión y visualización de catálogos de películas y series. Es un proyecto diseñado para ofrecer una interfaz intuitiva y una experiencia de usuario de alta calidad, permitiéndote organizar y explorar contenido multimedia de manera eficiente.',
    },
    {
      question: '¿Tiene algún costo Syspelis?',
      answer: 'No, Syspelis es totalmente gratuito. Este programa fue creado con fines demostrativos y de uso personal, permitiendo a los usuarios explorar todas sus funcionalidades de gestión y reproducción sin necesidad de suscripciones, pagos mensuales ni contratos.',
    },
    {
      question: '¿En qué dispositivos funciona Syspelis?',
      answer: 'Syspelis es compatible con cualquier dispositivo que cuente con un navegador web actualizado. Ya sea desde tu computadora de escritorio, laptop, tablet o teléfono móvil, la aplicación se adapta automáticamente para brindarte la mejor experiencia de visualización donde sea que estés.',
    },
    {
        question: '¿Cómo puedo reportar un error?',
        answer: 'Si encuentras algún problema técnico o tienes una sugerencia para mejorar Syspelis, puedes utilizar el formulario de contacto que se encuentra en esta misma página. Tu retroalimentación es fundamental para el desarrollo y mejora continua del programa.',
    }
  ];

  return (
    <div style={{ background: '#000', color: '#fff', padding: '40px 5%' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px' }}>
          Centro de Ayuda
        </h1>

        {/* Sección de Contacto Directo */}
        <div className="contact-cards">
          <div style={{ minWidth: '200px' }}>
            <h2 style={{ color: '#e50914', marginBottom: '15px' }}>Llámanos</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3122213326</p>
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Soporte 24/7 en español</p>
          </div>
          <div style={{ height: '80px', borderLeft: '1px solid #444', display: 'none' /* Ocultar en móvil si se desea, o manejar con media query */ }}></div>
          <div style={{ minWidth: '200px' }}>
            <h2 style={{ color: '#e50914', marginBottom: '15px' }}>Chat en Vivo</h2>
            <button style={{ padding: '12px 30px', background: '#e50914', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Iniciar Chat
            </button>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '5px' }}>Respuesta en minutos</p>
          </div>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', textAlign: 'center' }}>Preguntas Frecuentes</h2>
        <div style={{ marginBottom: '60px' }}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>

        {/* Formulario de contacto simple */}
        <div style={{ background: '#1f1f1f', padding: '40px', borderRadius: '8px', border: '1px solid #333' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>¿Necesitas más ayuda? Envíanos un mensaje</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Tu correo electrónico" required style={{ padding: '15px', background: '#333', border: '1px solid #555', borderRadius: '4px', color: '#fff', fontSize: '16px' }} />
                <textarea placeholder="Describe tu problema o consulta..." rows="5" required style={{ padding: '15px', background: '#333', border: '1px solid #555', borderRadius: '4px', color: '#fff', resize: 'vertical', fontSize: '16px' }}></textarea>
                <button type="submit" style={{ padding: '15px', background: '#e50914', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', alignSelf: 'flex-start' }}>
                    Enviar Mensaje
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}