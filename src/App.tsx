import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, CarFront, ChevronDown, Handshake, Layers3, Mail, MapPin, Menu, Music2, Play, ShieldCheck, Truck, Tv, X, CheckCircle2, Target, Instagram, Facebook, Youtube } from 'lucide-react'

const companies = [
  { id: 'btv', name: 'BTV', category: 'MEDIA & TELEVISÃO', short: 'Televisão, conteúdos audiovisuais, informação e entretenimento.', logo: 'BTV', accent: 'pink' },
  { id: 'mlc', name: 'Maputo Luxury Cars', category: 'MOBILIDADE PREMIUM', short: 'Serviços de transporte com motorista e soluções de mobilidade premium.', logo: 'MLC', accent: 'copper', url: 'https://maputoluxurycars.co.mz' },
  { id: 'bnews', name: 'BNEWS', category: 'INFORMAÇÃO', short: 'Notícias, actualidade e conteúdos informativos.', logo: 'BNEWS', accent: 'red' },
  { id: 'bawito', name: 'Bawito Music & Serviços', category: 'MÚSICA & EVENTOS', short: 'Gestão artística, produção e serviços ligados ao entretenimento.', logo: 'BAWITO', accent: 'blue' },
  { id: 'security', name: '24/7 Security', category: 'SEGURANÇA', short: 'Serviços de segurança e protecção de pessoas e património.', logo: '24/7', accent: 'scarlet' },
  { id: 'vuka', name: 'Vuka Logística & Serviços', category: 'LOGÍSTICA', short: 'Soluções de logística, transporte e serviços operacionais.', logo: 'VUKA', accent: 'royal' },
] as const

const services = [
  { name: 'Media', text: 'Comunicação, informação e entretenimento.', icon: Tv },
  { name: 'Mobilidade', text: 'Soluções de mobilidade e transporte.', icon: CarFront },
  { name: 'Segurança', text: 'Protecção de pessoas, bens e infra-estruturas.', icon: ShieldCheck },
  { name: 'Logística', text: 'Transporte, logística e serviços integrados.', icon: Truck },
  { name: 'Música & Eventos', text: 'Gestão artística e produção de eventos.', icon: Music2 },
]
const strengths = [
  { name: 'Presença multissectorial', text: 'Actividades diversificadas em sectores que se complementam.', icon: Layers3 },
  { name: 'Soluções integradas', text: 'Diferentes empresas, diferentes competências, uma visão comum.', icon: CheckCircle2 },
  { name: 'Foco na qualidade', text: 'Compromisso com o profissionalismo e a confiança.', icon: Target },
  { name: 'Parcerias estratégicas', text: 'Abertura à colaboração e à criação de novas oportunidades.', icon: Handshake },
]

function TreeMark({small = false}:{small?:boolean}) {
  return <svg className={small ? 'tree-mark small' : 'tree-mark'} viewBox="0 0 100 108" role="img" aria-label="Símbolo de árvore do Grupo Mbewu">
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path strokeWidth="5" d="M50 93c5-17 5-31 0-45M50 76c-14-6-24-17-33-30M51 65c14-5 26-16 34-28M48 86c-7 2-15 5-24 13M51 89c8 0 17 5 26 10M50 98c-14-1-27 1-38 5M50 98c14-1 27 1 38 5"/>
      <path strokeWidth="2.5" d="M50 48 37 22M55 56 68 24M44 58 23 30M61 65 81 44"/>
    </g>
    <g fill="currentColor">
      <ellipse cx="50" cy="13" rx="6" ry="12"/><ellipse cx="35" cy="17" rx="6" ry="11" transform="rotate(-30 35 17)"/><ellipse cx="65" cy="17" rx="6" ry="11" transform="rotate(30 65 17)"/>
      <ellipse cx="21" cy="26" rx="6" ry="11" transform="rotate(-48 21 26)"/><ellipse cx="79" cy="26" rx="6" ry="11" transform="rotate(48 79 26)"/>
      <ellipse cx="12" cy="40" rx="6" ry="11" transform="rotate(-65 12 40)"/><ellipse cx="88" cy="40" rx="6" ry="11" transform="rotate(65 88 40)"/>
      <ellipse cx="26" cy="43" rx="6" ry="10" transform="rotate(-39 26 43)"/><ellipse cx="74" cy="43" rx="6" ry="10" transform="rotate(39 74 43)"/>
      <ellipse cx="38" cy="35" rx="6" ry="10" transform="rotate(-22 38 35)"/><ellipse cx="62" cy="35" rx="6" ry="10" transform="rotate(22 62 35)"/>
      <ellipse cx="11" cy="57" rx="5" ry="10" transform="rotate(-75 11 57)"/><ellipse cx="89" cy="57" rx="5" ry="10" transform="rotate(75 89 57)"/>
      <ellipse cx="24" cy="60" rx="5" ry="10" transform="rotate(-65 24 60)"/><ellipse cx="76" cy="60" rx="5" ry="10" transform="rotate(65 76 60)"/>
    </g>
  </svg>
}
function Logo({footer=false}:{footer?:boolean}) {
  return <a href="#inicio" className={footer ? 'brand footer-brand' : 'brand'} aria-label="Grupo Mbewu — início"><TreeMark small/><span className="brand-words"><span>GRUPO</span><strong>MBEWU</strong></span></a>
}
function CompanyCard({company, index}:{company:typeof companies[number],index:number}) {
  return <article className={'company-card company-' + company.accent} style={{animationDelay: (index*70) + 'ms'}}>
    <div className="company-top"><span className="company-number">0{index+1} / 06</span><ArrowUpRight size={19} aria-hidden="true"/></div>
    <div className={'company-logo logo-' + company.accent}>{company.logo}</div>
    <div className="company-bottom"><span className="eyebrow company-category">{company.category}</span><h3>{company.name}</h3><p>{company.short}</p>
    {'url' in company ? <a href={company.url} target="_blank" rel="noopener noreferrer" className="company-link">Visitar website <ArrowUpRight size={16}/></a> : <span className="company-link muted">Conheça a empresa <ArrowRight size={16}/></span>}
    </div>
  </article>
}
export default function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, {passive:true}); fn()
    return () => window.removeEventListener('scroll', fn)
  },[])
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className={'site-header '+(scrolled?'is-scrolled':'')}>
      <div className="container header-inner">
        <Logo/><nav className={menuOpen?'nav-links open':'nav-links'} aria-label="Navegação principal">
          <a onClick={closeMenu} href="#inicio">Início</a><a onClick={closeMenu} href="#sobre">Sobre</a><a onClick={closeMenu} href="#empresas">Empresas</a><a onClick={closeMenu} href="#actuacao">Áreas de actuação</a><a onClick={closeMenu} href="#contactos">Contactos</a>
        </nav>
        <a className="header-cta" href="mailto:geral@grupombewu.co.mz?subject=Contacto%20institucional%20-%20Grupo%20Mbewu"><span>Fale connosco</span><ArrowUpRight size={17}/></a>
        <button type="button" className="menu-toggle" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>
    <main>
      <section id="inicio" className="hero">
        <div className="hero-glow" aria-hidden="true"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="tiny-line"/> UM UNIVERSO DE POSSIBILIDADES</span>
            <h1>Um grupo.<br/><span>Múltiplas</span><br/>soluções<span className="period">.</span></h1>
            <p>Um conjunto de marcas moçambicanas que actuam em diferentes sectores, com uma visão comum: criar valor, construir relações e abrir novas oportunidades.</p>
            <div className="hero-actions"><a className="btn btn-light" href="#sobre">Conheça o Grupo <ArrowUpRight size={18}/></a><a className="btn btn-outline" href="#empresas">Explorar empresas <ArrowRight size={18}/></a></div>
            <div className="hero-scroll"><ChevronDown size={16}/> DESCUBRA O GRUPO</div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
            <div className="hero-emblem"><TreeMark/><div className="hero-emblem-name"><span>GRUPO</span><strong>MBEWU</strong></div></div>
            <div className="hero-brand-strip"><span>MEDIA</span><i/><span>MOBILIDADE</span><i/><span>SEGURANÇA</span><i/><span>LOGÍSTICA</span></div>
            <span className="hero-visual-label">VISÃO PARTILHADA · IDENTIDADES ÚNICAS</span>
          </div>
        </div>
        <div className="hero-bottom-line"/>
      </section>
      <section id="sobre" className="about section-white"><div className="container about-grid">
        <div><span className="eyebrow dark-eyebrow"><span className="tiny-line"/> QUEM SOMOS</span><h2>Diferentes sectores.<br/><em>Uma visão comum.</em></h2></div>
        <div className="about-right"><p className="about-lead">O Grupo Mbewu reúne empresas com identidades próprias, presentes em diferentes áreas da economia moçambicana.</p><p>Da comunicação à mobilidade, da música à segurança e à logística, apostamos no desenvolvimento de actividades que respondem às necessidades de pessoas, empresas e instituições.</p><a className="text-link" href="#empresas">Descubra as nossas empresas <ArrowUpRight size={19}/></a></div>
      </div></section>
      <section id="empresas" className="companies-section section-dark"><div className="container">
        <div className="section-heading"><div><span className="eyebrow"><span className="tiny-line"/> O NOSSO ECOSSISTEMA</span><h2>Empresas do <em>Grupo.</em></h2></div><p>Marcas com identidade própria, unidas por uma ambição de crescimento e criação de valor.</p></div>
        <div className="companies-grid">{companies.map((company,index)=><CompanyCard key={company.id} company={company} index={index}/>)}</div>
        <p className="company-note">As marcas e descrições serão actualizadas com os respectivos materiais institucionais oficiais.</p>
      </div></section>
      <section id="actuacao" className="services-section section-white"><div className="container">
        <div className="center-heading"><span className="eyebrow dark-eyebrow">O QUE FAZEMOS</span><h2>Áreas de <em>actuação.</em></h2><p>Competências em diferentes sectores, reunidas num único grupo empresarial.</p></div>
        <div className="services-grid">{services.map((service,index)=><article className="service-card" key={service.name}><span className="service-index">0{index+1}</span><service.icon size={34} strokeWidth={1.45}/><h3>{service.name}</h3><p>{service.text}</p></article>)}</div>
      </div></section>
      <section className="strengths-section section-dark"><div className="container">
        <div className="section-heading strengths-heading"><div><span className="eyebrow"><span className="tiny-line"/> A NOSSA ABORDAGEM</span><h2>Mais do que empresas.<br/><em>Uma visão de futuro.</em></h2></div><p>Construímos o nosso percurso através da diversidade de competências e de uma aposta na colaboração.</p></div>
        <div className="strengths-grid">{strengths.map((strength)=><article className="strength-card" key={strength.name}><strength.icon size={30} strokeWidth={1.5}/><h3>{strength.name}</h3><p>{strength.text}</p></article>)}</div>
      </div></section>
      <section id="contactos" className="contact-section"><div className="container contact-layout"><div><span className="eyebrow">VAMOS CONVERSAR</span><h2>Novas ideias.<br/><em>Novas oportunidades.</em></h2><p>Quer estabelecer uma parceria ou saber mais sobre o Grupo Mbewu? Estamos disponíveis para conversar.</p><a className="btn btn-dark" href="mailto:geral@grupombewu.co.mz?subject=Contacto%20institucional%20-%20Grupo%20Mbewu">Entrar em contacto <ArrowUpRight size={19}/></a><p className="contact-notice">Endereço electrónico provisório — sujeito a confirmação.</p></div><div className="contact-symbol"><TreeMark/><span>JUNTOS, CONSTRUÍMOS O FUTURO.</span></div></div></section>
    </main>
    <footer className="footer"><div className="container">
      <div className="footer-grid"><div><Logo footer/><p>Um grupo moçambicano. Diferentes sectores. Uma visão comum.</p></div><div><span className="footer-title">Explorar</span><a href="#sobre">Sobre o Grupo</a><a href="#empresas">Empresas</a><a href="#actuacao">Áreas de actuação</a></div><div><span className="footer-title">Contactos</span><span className="footer-line"><MapPin size={16}/> Maputo, Moçambique</span><span className="footer-line"><Mail size={16}/> Contacto por confirmar</span></div><div><span className="footer-title">Grupo Mbewu</span><p>Conheça as marcas que fazem parte do nosso universo empresarial.</p></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Grupo Mbewu. Todos os direitos reservados.</span><span>Desenvolvido com visão de futuro.</span></div>
    </div></footer>
  </>
}