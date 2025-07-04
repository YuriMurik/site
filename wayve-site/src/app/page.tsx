"use client";
import styles from "./page.module.css";
import Image from "next/image";
import ContatoForm from "./ContatoForm";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["section-visible"]);
          } else {
            entry.target.classList.remove(styles["section-visible"]);
          }
        });
        // Atualiza o indicador ativo
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const idx = sectionRefs.current.findIndex(ref => ref === visible[0].target);
          if (idx !== -1) setActiveSection(idx);
        }
      },
      { threshold: 0.5 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Fecha o menu ao clicar em um link
  const handleMenuLinkClick = () => setMenuOpen(false);

  return (
    <>
      {/* Menu Superior */}
      <header className={styles.headerMenu}>
        <nav className={styles.navMenu}>
          <a href="#home" className={styles.logoMenu}>
            <Image src="/assets/logo-wayve-mini.svg" alt="Wayve Logo Mini" width={40} height={14} />
          </a>
          <button
            className={styles.hamburgerBtn}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.hamburgerIcon}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <ul
            id="main-menu"
            className={
              styles.menuLinks +
              (menuOpen ? " " + styles.menuOpen : "")
            }
          >
            <li><a href="#home" onClick={handleMenuLinkClick}>Home</a></li>
            <li><a href="#sobre" onClick={handleMenuLinkClick}>Sobre</a></li>
            <li><a href="#servicos" onClick={handleMenuLinkClick}>Serviços</a></li>
            <li><a href="#projetos" onClick={handleMenuLinkClick}>Projetos</a></li>
            <li><a href="#depoimentos" onClick={handleMenuLinkClick}>Depoimentos</a></li>
            <li><a href="#contato" onClick={handleMenuLinkClick}>Contato</a></li>
          </ul>
        </nav>
      </header>
      {/* Indicadores de navegação lateral */}
      <nav className={styles.navIndicators} aria-label="Navegação de seções">
        <ul>
          <li><button aria-label="Home" onClick={() => document.getElementById('home')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 0 ? ' ' + styles.indicatorActive : '')}></button></li>
          <li><button aria-label="Sobre" onClick={() => document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 1 ? ' ' + styles.indicatorActive : '')}></button></li>
          <li><button aria-label="Serviços" onClick={() => document.getElementById('servicos')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 2 ? ' ' + styles.indicatorActive : '')}></button></li>
          <li><button aria-label="Projetos" onClick={() => document.getElementById('projetos')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 3 ? ' ' + styles.indicatorActive : '')}></button></li>
          <li><button aria-label="Depoimentos" onClick={() => document.getElementById('depoimentos')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 4 ? ' ' + styles.indicatorActive : '')}></button></li>
          <li><button aria-label="Contato" onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})} className={styles.indicator + (activeSection === 5 ? ' ' + styles.indicatorActive : '')}></button></li>
        </ul>
      </nav>
      <div className={styles.fullpage}>
        {/* Seção 1 - Home */}
        <section
          id="home"
          className={styles.section + " " + styles.homeSection}
          ref={el => { sectionRefs.current[0] = el; }}
        >
          <div className={styles.logoCentralizada}>
            <Image src="/assets/logo-wayve.svg" alt="Wayve Logo" width={120} height={40} className={styles.logoWayve} />
          </div>
          <h1>Transformamos ideias em soluções digitais.</h1>
          <h2>Software sob medida com inovação, agilidade e foco no seu negócio.</h2>
          <a href="#sobre" className={styles.btnScroll}>Saiba mais →</a>
        </section>
        {/* Seção 2 - Sobre nós */}
        <section
          id="sobre"
          className={styles.section + " " + styles.sobreSection}
          ref={el => { sectionRefs.current[1] = el; }}
        >
          <h2>Quem somos</h2>
          <p className={styles.descricao}>
            A Wayve é uma empresa focada em criar soluções digitais inovadoras, com uma equipe apaixonada por tecnologia, excelência e parceria com nossos clientes. Nossa missão é impulsionar negócios através de software sob medida, com visão de futuro e valores sólidos.
          </p>
          <div className={styles.destaques}>
            <div className={styles.destaqueItem}>
              <span className={styles.icon}>🚀</span>
              <h3>Inovação</h3>
            </div>
            <div className={styles.destaqueItem}>
              <span className={styles.icon}>🤝</span>
              <h3>Parceria</h3>
            </div>
            <div className={styles.destaqueItem}>
              <span className={styles.icon}>🧠</span>
              <h3>Especialistas</h3>
            </div>
          </div>
        </section>
        {/* Seção 3 - Serviços */}
        <section
          id="servicos"
          className={styles.section + " " + styles.servicosSection}
          ref={el => { sectionRefs.current[2] = el; }}
        >
          <h2>O que fazemos</h2>
          <div className={styles.servicosGrid}>
            <div className={styles.servico}>
              <Image src="/assets/web-dev.svg" alt="Web" width={48} height={48} />
              <h3>Desenvolvimento Web</h3>
              <p>Sites, sistemas e portais modernos, responsivos e seguros.</p>
            </div>
            <div className={styles.servico}>
              <Image src="/assets/mobile-app.svg" alt="Mobile" width={48} height={48} />
              <h3>Aplicativos Mobile</h3>
              <p>Apps nativos e híbridos para Android e iOS.</p>
            </div>
            <div className={styles.servico}>
              <Image src="/assets/api.svg" alt="APIs" width={48} height={48} />
              <h3>APIs e Integrações</h3>
              <p>Integração de sistemas, automação e APIs robustas.</p>
            </div>
            <div className={styles.servico}>
              <Image src="/assets/consulting.svg" alt="Consultoria" width={48} height={48} />
              <h3>Consultoria Técnica</h3>
              <p>Mentoria, arquitetura e revisão de projetos.</p>
            </div>
            <div className={styles.servico}>
              <Image src="/assets/uxui.svg" alt="UX/UI" width={48} height={48} />
              <h3>UX/UI Design</h3>
              <p>Experiências digitais intuitivas e atraentes.</p>
            </div>
            <div className={styles.servico}>
              <Image src="/assets/support.svg" alt="Suporte" width={48} height={48} />
              <h3>Suporte & Manutenção</h3>
              <p>Atendimento ágil e acompanhamento contínuo.</p>
            </div>
          </div>
        </section>

        {/* Seção 4 - Projetos / Portfólio */}
        <section
          id="projetos"
          className={styles.section + " " + styles.projetosSection}
          ref={el => { sectionRefs.current[3] = el; }}
        >
          <h2>Nossos projetos</h2>
          <div className={styles.projetosCarousel}>
            <div className={styles.projetoCard}>
              <Image src="/assets/projeto1.png" alt="Projeto 1" width={320} height={180} />
              <div className={styles.projetoInfo}>
                <h3>Projeto Alpha</h3>
                <p>Plataforma de gestão para empresas de logística.</p>
                <span className={styles.techStack}>React, Node.js, AWS</span>
              </div>
            </div>
            <div className={styles.projetoCard}>
              <Image src="/assets/projeto2.png" alt="Projeto 2" width={320} height={180} />
              <div className={styles.projetoInfo}>
                <h3>Projeto Beta</h3>
                <p>App mobile para delivery personalizado.</p>
                <span className={styles.techStack}>Flutter, Firebase</span>
              </div>
            </div>
            <div className={styles.projetoCard}>
              <Image src="/assets/projeto3.png" alt="Projeto 3" width={320} height={180} />
              <div className={styles.projetoInfo}>
                <h3>Projeto Gamma</h3>
                <p>Dashboard de BI para fintechs.</p>
                <span className={styles.techStack}>Vue.js, Python, GCP</span>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 5 - Depoimentos / Clientes */}
        <section
          id="depoimentos"
          className={styles.section + " " + styles.depoimentosSection}
          ref={el => { sectionRefs.current[4] = el; }}
        >
          <h2>O que dizem nossos clientes</h2>
          <div className={styles.depoimentosCarousel}>
            <div className={styles.depoimento}>
              <Image src="/assets/cliente1.jpg" alt="Cliente 1" width={64} height={64} />
              <blockquote>“A Wayve superou nossas expectativas em todos os aspectos!”</blockquote>
              <span className={styles.clienteNome}>Ana Souza, LogiTech</span>
            </div>
            <div className={styles.depoimento}>
              <Image src="/assets/cliente2.jpg" alt="Cliente 2" width={64} height={64} />
              <blockquote>“Equipe ágil, inovadora e sempre pronta para ajudar.”</blockquote>
              <span className={styles.clienteNome}>Carlos Lima, FoodApp</span>
            </div>
            <div className={styles.depoimento}>
              <Image src="/assets/cliente3.jpg" alt="Cliente 3" width={64} height={64} />
              <blockquote>“Transformaram nossa ideia em um produto de sucesso!”</blockquote>
              <span className={styles.clienteNome}>Juliana Dias, FinBI</span>
            </div>
          </div>
          <div className={styles.clientesLogos}>
            <Image src="/assets/logo-client1.svg" alt="Cliente 1" width={36} height={36} />
            <Image src="/assets/logo-client2.svg" alt="Cliente 2" width={36} height={36} />
            <Image src="/assets/logo-client3.svg" alt="Cliente 3" width={36} height={36} />
          </div>
        </section>

        {/* Seção 6 - Contato */}
        <section
          id="contato"
          className={styles.section + " " + styles.contatoSection}
          ref={el => { sectionRefs.current[5] = el; }}
        >
          <h2>Fale com a Wayve</h2>
          <ContatoForm />
          <div className={styles.alternativasContato}>
            <p>📧 Email: <a href="mailto:contato@wayve.com">contato@wayve.com</a></p>
            <p>☎️ WhatsApp: <a href="tel:+5511999999999">(11) 99999-9999</a></p>
            <div className={styles.redesSociais}>
              <a href="#"><Image src="/assets/instagram.svg" alt="Instagram" width={28} height={28} /></a>
              <a href="#"><Image src="/assets/linkedin.svg" alt="LinkedIn" width={28} height={28} /></a>
              <a href="#"><Image src="/assets/github.svg" alt="GitHub" width={28} height={28} /></a>
            </div>
          </div>
        </section>

        {/* Seção 7 - Footer / Créditos */}
        <footer id="footer" className={styles.footerSection}>
          <Image src="/assets/logo-wayve-mini.svg" alt="Wayve Logo Mini" width={60} height={20} className={styles.logoMini} />
          <p>© 2025 Wayve - Todos os direitos reservados</p>
          <nav className={styles.footerLinks}>
            <a href="#home">Home</a> |
            <a href="#servicos">Serviços</a> |
            <a href="#contato">Contato</a>
          </nav>
          <p className={styles.cookies}>Este site utiliza cookies. <a href="#">Política de Privacidade</a></p>
        </footer>
      </div>
    </>
  );
}
