import { useEffect, useRef, useState } from 'react'
import { CookieNotice, LegalContent, getLegalPageFromHash, legalPageHash, type LegalPage } from './LegalCenter'
import btvLogo from './assets/logos/empresas/btv.png'
import mlcLogo from './assets/logos/empresas/maputo-luxury-cars.png'
import bnewsLogo from './assets/logos/empresas/bnews.png'
import bawitoLogo from './assets/logos/empresas/bawito-music-servicos.png'
import securityLogo from './assets/logos/empresas/24-7-security.png'
import vukaLogo from './assets/logos/empresas/vuka-logistica-servicos.png'
import presidenteFoto from './assets/images/presidente/presidente.jpg'
import grupoMbewuLogo from './assets/logos/grupo/grupo-mbewu.png'
import salvadorMissaoFoto from './assets/images/Salvador Maiaze.jpeg'
import forumPortugalFoto from './assets/images/Presidente-da-República-discursa-no-Fórum-Económico-Portugal-Moçambique-na-Cidade-do-Porto10-e1765356290135.jpeg'
import { ArrowRight, ArrowUpRight, CarFront, ChevronDown, Handshake, Layers3, Mail, MapPin, Phone, Menu, Music2, Play, ShieldCheck, Truck, Tv, X, CheckCircle2, Target, Instagram, Facebook, Youtube } from 'lucide-react'

const companies = [
  { id: 'bawito', name: 'Bawito Music & Serviços', category: 'MÚSICA & EVENTOS', short: 'Gestão artística, produção e serviços ligados ao entretenimento.', logo: bawitoLogo, accent: 'blue' },
  { id: 'vuka', name: 'Vuka Logística & Serviços', category: 'LOGÍSTICA', short: 'Soluções de logística, transporte e serviços operacionais.', logo: vukaLogo, accent: 'royal' },
  { id: 'btv', name: 'BTV', category: 'MEDIA & TELEVISÃO', short: 'Televisão, conteúdos audiovisuais, informação e entretenimento.', logo: btvLogo, accent: 'pink' },
  { id: 'security', name: '24/7 Security', category: 'SEGURANÇA', short: 'Serviços de segurança e protecção de pessoas e património.', logo: securityLogo, accent: 'scarlet' },
  { id: 'mlc', name: 'Maputo Luxury Cars', category: 'MOBILIDADE PREMIUM', short: 'Serviços de transporte com motorista e soluções de mobilidade premium.', logo: mlcLogo, accent: 'copper', url: 'https://maputoluxurycars.co.mz/' },
  { id: 'bnews', name: 'BNEWS', category: 'INFORMAÇÃO', short: 'Notícias, actualidade e conteúdos informativos.', logo: bnewsLogo, accent: 'red', url: 'https://bnews.co.mz/' },
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

function Logo({footer=false}:{footer?:boolean}) {
  // Símbolo e letras extraídos directamente do logótipo fornecido pelo Grupo.
  // O recorte preserva os desenhos originais e remove só o fundo grafite do PNG.
  const filterId = footer ? 'mbewu-logo-ink-footer' : 'mbewu-logo-ink-header'
  return <a href="#inicio" className={footer ? 'brand footer-brand' : 'brand'} aria-label="Grupo Mbewu — início">
    <svg className="brand-original-symbol" viewBox="325 167 605 537" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="brightness"/>
          <feComponentTransfer in="brightness" result="cutout">
            <feFuncA type="linear" slope="1.7" intercept="-0.4"/>
          </feComponentTransfer>
          <feFlood floodColor="#FFFFFF" result="white"/>
          <feComposite in="white" in2="cutout" operator="in"/>
        </filter>
      </defs>
      <image href={grupoMbewuLogo} width="1254" height="1254" filter={`url(#${filterId})`}/>
    </svg>
    <svg className="brand-original-wordmark" viewBox="171 692 919 350" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <image href={grupoMbewuLogo} width="1254" height="1254" filter={`url(#${filterId})`}/>
    </svg>
  </a>
}
function CompanyCard({company}:{company:typeof companies[number]}) {
  const website = 'url' in company ? company.url : undefined
  return <article data-reveal className={'company-card company-' + company.id}>
    <div className="company-logo-stage">
      <svg className="company-logo-art company-logo-transparent" role="img" aria-label={`Logótipo da ${company.name}`} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id={`company-logo-cutout-${company.id}`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="luminance"/>
            <feComponentTransfer in="luminance" result="cleanAlpha">
              <feFuncA type="linear" slope={company.id === 'vuka' ? 2.35 : 1.7} intercept={company.id === 'vuka' ? -0.8 : -0.2}/>
            </feComponentTransfer>
            <feFlood floodColor="#FFFFFF" result="white"/>
            <feComposite in="white" in2="cleanAlpha" operator="in"/>
          </filter>
        </defs>
        <image href={company.logo} x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet" filter={`url(#company-logo-cutout-${company.id})`}/>
      </svg>
    </div>
    <div className="company-card-content">
      <h3>{company.name}</h3>
      <p>{company.short}</p>
    </div>
    <div className="company-card-action">
      {website && <a href={website} target="_blank" rel="noopener noreferrer" className="company-link">Saber mais <ArrowUpRight size={15}/></a>}
    </div>
  </article>
}
export default function App() {
  const [menuOpen,setMenuOpen] = useState(false)
  const [scrolled,setScrolled] = useState(false)
  const getArticleFromHash = (): 'btv' | 'vuka' | 'forum' | null => {
    if (window.location.hash === '#artigo-btv-tvcabo') return 'btv'
    if (window.location.hash === '#artigo-salvador-maiaze-cta') return 'vuka'
    if (window.location.hash === '#artigo-salvador-maiaze-forum-portugal') return 'forum'
    return null
  }
  const [activeArticle,setActiveArticle] = useState<'btv' | 'vuka' | 'forum' | null>(getArticleFromHash)
  const articleOpen = activeArticle !== null
  const [legalPage,setLegalPage] = useState<LegalPage | null>(getLegalPageFromHash)
  const [cookiePreferencesRequest,setCookiePreferencesRequest] = useState(0)
  const openCookiePreferences = () => setCookiePreferencesRequest(value => value + 1)
  const openLegal = (page:LegalPage) => {
    window.history.pushState({legal:page},'',legalPageHash(page))
    setActiveArticle(null)
    setLegalPage(page)
    setMenuOpen(false)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const closeLegal = () => {
    window.history.pushState({},'','#inicio')
    setLegalPage(null)
    setActiveArticle(null)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const newsTrackRef = useRef<HTMLDivElement>(null)
  const moveNews = (direction: number) => {
    const track = newsTrackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('.news-card')
    track.scrollBy({left: direction * (card ? card.getBoundingClientRect().width + 22 : track.clientWidth * .8), behavior: 'smooth'})
  }
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, {passive:true}); fn()
    return () => window.removeEventListener('scroll', fn)
  },[])
  useEffect(() => {
    // Cada vista monta elementos diferentes. Reobservar ao alternar entre notícia e página inicial
    // impede que a classe de animação deixe secções invisíveis.
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.remove('motion-ready')
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
        else entry.target.classList.remove('is-visible')
      })
    }, {threshold: .08, rootMargin: '0px 0px 35px 0px'})
    targets.forEach(el => observer.observe(el))
    document.documentElement.classList.add('motion-ready')
    return () => {
      document.documentElement.classList.remove('motion-ready')
      observer.disconnect()
      targets.forEach(el => el.classList.add('is-visible'))
    }
  }, [articleOpen,legalPage])
  useEffect(() => {
    if (articleOpen || legalPage) return
    const hash = window.location.hash
    if (!hash || hash.startsWith('#artigo-')) return
    const id = decodeURIComponent(hash.slice(1))
    const raf = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({behavior:'instant'})
    })
    return () => window.cancelAnimationFrame(raf)
  }, [articleOpen,legalPage])
  useEffect(() => {
    const syncLocation = () => {
      setActiveArticle(getArticleFromHash())
      setLegalPage(getLegalPageFromHash())
    }
    window.addEventListener('popstate', syncLocation)
    window.addEventListener('hashchange', syncLocation)
    return () => {
      window.removeEventListener('popstate', syncLocation)
      window.removeEventListener('hashchange', syncLocation)
    }
  }, [])
  const openArticle = (article: 'btv' | 'vuka' | 'forum') => {
    setLegalPage(null)
    const hash = article === 'forum' ? '#artigo-salvador-maiaze-forum-portugal' : article === 'vuka' ? '#artigo-salvador-maiaze-cta' : '#artigo-btv-tvcabo'
    window.history.pushState({article}, '', hash)
    setActiveArticle(article)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const closeArticle = () => {
    window.history.pushState({}, '', '#actualidade')
    setActiveArticle(null)
    window.requestAnimationFrame(() => document.getElementById('actualidade')?.scrollIntoView({behavior:'instant'}))
  }
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className={'site-header '+(scrolled?'is-scrolled':'')}>
      <div className="container header-inner">
        <Logo/><nav className={menuOpen?'nav-links open':'nav-links'} aria-label="Navegação principal">
          <a onClick={closeMenu} href="#inicio">Início</a><a onClick={closeMenu} href="#sobre">Sobre</a><a onClick={closeMenu} href="#empresas">Empresas</a><a onClick={closeMenu} href="#actuacao">Áreas de actuação</a><a onClick={closeMenu} href="#actualidade">Actualidade</a><a onClick={closeMenu} href="#contactos">Contactos</a>
        </nav>
        <a className="header-cta" href="#contactos"><span>Fale connosco</span><ArrowUpRight size={17}/></a>
        <button type="button" className="menu-toggle" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </header>
    {legalPage ? <LegalContent page={legalPage} onBack={closeLegal} onNavigate={openLegal} onOpenPreferences={openCookiePreferences}/> : !articleOpen ? <main>
      <section id="inicio" className="hero hero-identity">
        <div className="hero-ambient hero-ambient-one" aria-hidden="true"/>
        <div className="hero-ambient hero-ambient-two" aria-hidden="true"/>
        <div className="hero-identity-lines" aria-hidden="true"/>
        <div className="container hero-identity-grid hero-identity-grid-solo">
          <div className="hero-identity-copy">
            <span className="hero-identity-eyebrow">GRUPO EMPRESARIAL MOÇAMBICANO</span>
            <h1 className="hero-animated-headline"><span className="hero-title-line">Um grupo.</span><span className="hero-title-line hero-title-accent">Diferentes sectores.</span><span className="hero-title-line">Uma visão de futuro.</span></h1>
            <p>Reunimos marcas com identidade própria em diferentes sectores de actividade, unidos pelo compromisso de criar valor e desenvolver novas oportunidades.</p>
            <div className="hero-actions">
              <a className="btn btn-light" href="#sobre">Conheça o Grupo <ArrowUpRight size={18}/></a>
              <a className="btn btn-outline" href="#empresas">As nossas empresas <ArrowRight size={18}/></a>
            </div>
          </div>
        </div>
        <div className="hero-identity-bottom">
          <div className="container hero-identity-bottom-inner">
            <span>MOÇAMBIQUE</span>
            <span>MEDIA <i/> MOBILIDADE <i/> SEGURANÇA <i/> LOGÍSTICA <i/> MÚSICA & EVENTOS</span>
            <a href="#sobre" aria-label="Descer para conhecer o Grupo"><ChevronDown size={19}/></a>
          </div>
        </div>
      </section>
      <section id="sobre" className="about section-white"><div className="container about-grid">
        <div data-reveal><span className="eyebrow dark-eyebrow"><span className="tiny-line"/> QUEM SOMOS</span><h2>Diferentes sectores.<br/><em>Uma visão comum.</em></h2></div>
        <div data-reveal className="about-right"><p className="about-lead">O Grupo Mbewu reúne empresas com identidades próprias, presentes em diferentes áreas da economia moçambicana.</p><p>Da comunicação à mobilidade, da música à segurança e à logística, apostamos no desenvolvimento de actividades que respondem às necessidades de pessoas, empresas e instituições.</p><a className="text-link" href="#empresas">Descubra as nossas empresas <ArrowUpRight size={19}/></a></div>
      </div></section>
      <section id="empresas" className="companies-section section-dark"><div className="container">
        <div data-reveal className="companies-heading"><span className="eyebrow"><span className="tiny-line"/> GRUPO MBEWU <span className="tiny-line"/></span><h2>Empresas do <em>Grupo.</em></h2><p>Marcas com identidade própria, unidas por uma visão comum.</p></div>
        <div className="companies-grid">{companies.map(company=><CompanyCard key={company.id} company={company}/>)}</div>
        
      </div></section>
      <section id="actuacao" className="services-section section-white"><div className="container">
        <div data-reveal className="center-heading"><span className="eyebrow dark-eyebrow">O QUE FAZEMOS</span><h2>Áreas de <em>actuação.</em></h2><p>Competências em diferentes sectores, reunidas num único grupo empresarial.</p></div>
        <div className="services-grid">{services.map((service,index)=><article data-reveal className="service-card" key={service.name}><span className="service-index">0{index+1}</span><service.icon size={34} strokeWidth={1.45}/><h3>{service.name}</h3><p>{service.text}</p></article>)}</div>
      </div></section>
      <section className="strengths-section section-dark"><div className="container">
        <div data-reveal className="section-heading strengths-heading"><div><span className="eyebrow"><span className="tiny-line"/> A NOSSA ABORDAGEM</span><h2>Mais do que empresas.<br/><em>Uma visão de futuro.</em></h2></div><p>Construímos o nosso percurso através da diversidade de competências e de uma aposta na colaboração.</p></div>
        <div className="strengths-grid">{strengths.map((strength)=><article data-reveal className="strength-card" key={strength.name}><strength.icon size={30} strokeWidth={1.5}/><h3>{strength.name}</h3><p>{strength.text}</p></article>)}</div>
      </div></section>
      <section id="presidencia" className="president-section" aria-labelledby="president-title">
        <div className="container president-layout">
          <div data-reveal className="president-visual">
            <div className="president-portrait">
              <img src={presidenteFoto} alt="Salvador Pedro Maiaze, Presidente do Grupo Mbewu" loading="lazy" decoding="async"/>
            </div>
          </div>
          <div data-reveal className="president-copy">
            <span className="eyebrow dark-eyebrow">LIDERANÇA INSTITUCIONAL</span>
            <span className="president-kicker">Presidente do Grupo Mbewu</span>
            <h2 id="president-title">Salvador Pedro<br/><em>Maiaze.</em></h2>
            <p className="president-intro">Salvador Pedro Maiaze lidera o Grupo Mbewu com uma visão orientada para o crescimento, a inovação e a criação de oportunidades. Sob a sua Presidência, o Grupo reúne empresas de diferentes sectores, com identidades próprias e uma ambição comum: gerar valor para Moçambique.</p>
            <p>A sua liderança valoriza a cooperação entre as empresas, o compromisso com a qualidade e a construção de relações de confiança com clientes e parceiros, projectando o Grupo Mbewu como uma organização voltada para o futuro.</p>
          </div>
        </div>
      </section>
      <section id="actualidade" className="news-section" aria-labelledby="news-heading">
        <div className="container">
          <div data-reveal className="news-heading">
            <div className="news-heading-copy">
              <span className="eyebrow dark-eyebrow">ACONTECE NO GRUPO</span>
              <h2 id="news-heading">Últimos <em>acontecimentos.</em></h2>
              <p>Notícias, projectos e iniciativas das empresas do Grupo Mbewu.</p>
            </div>
            <div className="news-controls" aria-label="Navegação dos destaques">
              <button className="news-arrow" type="button" onClick={() => moveNews(-1)} aria-label="Ver destaques anteriores"><ArrowRight size={21} className="news-arrow-back"/></button>
              <button className="news-arrow" type="button" onClick={() => moveNews(1)} aria-label="Ver destaques seguintes"><ArrowRight size={21}/></button>
            </div>
          </div>
          <div className="news-track" ref={newsTrackRef} role="region" aria-label="Carrossel de acontecimentos" tabIndex={0}>
            {[
              {label:'BTV · EXPANSÃO',heading:'BTV reforça presença nacional com entrada na TVCABO',number:'01',icon:Tv,date:'23 de Setembro de 2026',excerpt:'Desde 1 de Outubro, o canal integra a grelha da TVCABO na posição 323, alargando o acesso à informação, cultura e entretenimento produzidos em Moçambique.',image:'https://supabase.datacenterhub.tech/storage/v1/object/public/bnews-media/library/1790190834153-422c6627-btv-easy-resize.webp',url:'https://bnews.co.mz/artigo/btv-chega-tvcabo-e-abre-nova-etapa-de-expans-o'},
              {label:'VUKA LOGÍSTICA · INTERNACIONALIZAÇÃO',heading:'Vuka Logística Reforça Presença Internacional em Missão Empresarial da CTA aos EUA',number:'02',icon:Truck,date:null,excerpt:'Em representação da Vuka Logística & Serviços, Salvador Maiaze participou numa missão empresarial orientada para novas oportunidades de cooperação económica internacional.',image:salvadorMissaoFoto,url:'#artigo-salvador-maiaze-cta'},
              {label:'VUKA LOGÍSTICA · COOPERAÇÃO',heading:'Portugal–Moçambique: Vuka Logística Explora Perspectivas de Cooperação Empresarial',number:'03',icon:Handshake,date:null,excerpt:'Em representação da Vuka Logística & Serviços, Salvador Maiaze participou no fórum realizado no Porto, dedicado à cooperação e às oportunidades empresariais entre os dois países.',image:forumPortugalFoto,url:'#artigo-salvador-maiaze-forum-portugal'},
            ].map(item => <article className={'news-card' + (item.url ? ' news-card-published' : '')} key={item.number}>
              <div className="news-card-media">
                {item.image ? <img className="news-card-image" src={item.image} alt={item.number === '03' ? 'Intervenção no Fórum Económico Portugal–Moçambique' : item.number === '02' ? 'Delegação empresarial moçambicana nos Estados Unidos da América' : 'Anúncio da chegada da BTV à grelha da TVCABO'} loading="lazy" decoding="async"/> : <item.icon size={56} strokeWidth={1.15} aria-hidden="true"/>}
                <span className="news-card-number">{item.number} / 03</span>
                {!item.image && <span className="news-card-media-note">IMAGEM DO ARTIGO</span>}
              </div>
              <div className="news-card-body">
                <span className="news-card-category">{item.label}</span>
                {item.date && <span className="news-card-date">{item.date}</span>}
                <h3>{item.heading}</h3>
                {item.excerpt ? <p className="news-card-excerpt">{item.excerpt}</p> : <span className="news-card-pending">Conteúdo a adicionar</span>}
                {item.url && <span className="news-card-read">Ler notícia completa <ArrowUpRight size={17}/></span>}
              </div>
              {item.url && <button className="news-card-hitarea" type="button" onClick={() => openArticle(item.number === '03' ? 'forum' : item.number === '02' ? 'vuka' : 'btv')} aria-label={'Ler artigo completo: ' + item.heading}/>}
            </article>)}
          </div>
          <p className="news-disclaimer">Acompanhe os acontecimentos e iniciativas das empresas do Grupo Mbewu.</p>
        </div>
      </section>
    </main> : <main className="article-page" id="artigo-btv" aria-labelledby="article-full-title">
      <div className="article-page-top">
        <div className="container article-page-nav">
          <button type="button" className="article-back" onClick={closeArticle}><ArrowRight size={19} className="article-back-icon"/> Voltar às notícias</button>
          <span className="article-breadcrumb">GRUPO MBEWU <span>/</span> ACTUALIDADE</span>
        </div>
      </div>
      {activeArticle === 'forum' ? <>
      <article className="article-page-article">
        <div className="article-shell">
          <header className="article-page-heading">
            <span className="article-category">VUKA LOGÍSTICA <span className="article-category-dot">·</span> COOPERAÇÃO INTERNACIONAL</span>
            <h1 id="article-full-title">Portugal–Moçambique: Vuka Logística Explora Perspectivas de Cooperação Empresarial</h1>
            <p className="article-page-standfirst">O empresário participou no encontro realizado no Porto, dedicado ao reforço das relações empresariais e à identificação de oportunidades de investimento entre Moçambique e Portugal.</p>
            <div className="article-meta"><span>Vuka Logística &amp; Serviços</span><span className="article-meta-divider" aria-hidden="true"/><span>Felisberto Ruco</span></div>
          </header>
          <figure className="article-page-figure">
            <img className="article-featured" src={forumPortugalFoto} alt="Intervenção no Fórum Económico Portugal–Moçambique, na cidade do Porto" />
            <figcaption>Fórum Económico Portugal–Moçambique, na cidade do Porto.</figcaption>
          </figure>
          <div className="article-content article-page-content">
            <p className="article-lead">O empresário moçambicano Salvador Maiaze, ligado à Vuka Logística &amp; Serviços, empresa integrante do Grupo Mbewu, participou no Fórum Económico Portugal–Moçambique, realizado na cidade do Porto, num encontro dedicado ao reforço das relações empresariais, à cooperação bilateral e à identificação de novas oportunidades de investimento entre os dois países.</p>
            <p>A participação de Salvador Maiaze nesta iniciativa enquadra-se numa perspectiva de aproximação a mercados internacionais e de valorização das oportunidades de colaboração entre empresas moçambicanas e portuguesas.</p>
            <p>O fórum reuniu representantes empresariais e institucionais num espaço de diálogo sobre as relações económicas entre Moçambique e Portugal, proporcionando oportunidades de intercâmbio de experiências, estabelecimento de contactos e identificação de áreas com potencial para futuras parcerias.</p>
            <h3>Cooperação Bilateral e Novas Oportunidades de Investimento</h3>
            <p>Numa publicação divulgada nas redes sociais, Salvador Maiaze destacou a importância do encontro para o fortalecimento das relações económicas entre os dois países.</p>
            <p>O empresário considerou a participação no Fórum Económico Portugal–Moçambique uma oportunidade de diálogo estratégico, de reforço da cooperação bilateral e de abertura de novos caminhos para o investimento.</p>
            <p>A iniciativa constituiu igualmente uma plataforma de aproximação entre empresários, permitindo discutir perspectivas de crescimento, colaboração institucional e desenvolvimento de relações comerciais.</p>
            <p>Para Salvador Maiaze, a presença moçambicana nestes espaços internacionais representa uma oportunidade de demonstrar o potencial do País e a capacidade dos seus empresários de participarem activamente em iniciativas de cooperação económica.</p>
            <h3>Internacionalização e Visão Empresarial</h3>
            <p>A participação no fórum assume particular relevância para empresas interessadas em acompanhar a evolução dos mercados internacionais e identificar oportunidades de cooperação.</p>
            <p>No caso da Vuka Logística &amp; Serviços, que desenvolve actividades nos sectores da logística, transporte e serviços operacionais, a aproximação a espaços de relacionamento empresarial internacional poderá contribuir para o conhecimento de novos mercados e potenciais parceiros.</p>
            <p>A presença de Salvador Maiaze neste encontro reforça, igualmente, a dimensão internacional do seu percurso empresarial e a importância atribuída ao diálogo, à cooperação e à criação de novas oportunidades de desenvolvimento.</p>
            <p>O empresário sublinhou, na sua publicação, o orgulho de representar Moçambique num espaço onde a cultura, a liderança e a visão empresarial se encontram.</p>
            <p>A participação no Fórum Económico Portugal–Moçambique constitui, assim, mais um momento de presença internacional associado ao universo empresarial do Grupo Mbewu, sem prejuízo de eventuais resultados comerciais dependerem de negociações e contactos posteriores.</p>
          </div>
        </div>
        <aside className="article-related" aria-labelledby="related-title">
          <div className="article-related-heading"><span className="eyebrow dark-eyebrow">ACTUALIDADE DO GRUPO</span><h2 id="related-title">Outros acontecimentos</h2></div>
          <div className="article-related-grid">
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('btv')}>
              <div className="related-card-visual related-card-photo"><img src="https://supabase.datacenterhub.tech/storage/v1/object/public/bnews-media/library/1790190834153-422c6627-btv-easy-resize.webp" alt="Acordo BTV e TVCABO" loading="lazy"/><span>BTV · EXPANSÃO</span></div>
              <div className="related-card-copy"><span>NOTÍCIAS</span><h3>BTV reforça presença nacional com entrada na TVCABO</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('vuka')}>
              <div className="related-card-visual related-card-photo"><img src={salvadorMissaoFoto} alt="Delegação empresarial moçambicana" loading="lazy"/><span>VUKA LOGÍSTICA · CTA</span></div>
              <div className="related-card-copy"><span>COOPERAÇÃO INTERNACIONAL</span><h3>Vuka Logística Reforça Presença Internacional em Missão Empresarial da CTA aos EUA</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
          </div>
        </aside>
      </article>
      </> : activeArticle === 'vuka' ? <>
      <article className="article-page-article">
        <div className="article-shell">
          <header className="article-page-heading">
            <span className="article-category">VUKA LOGÍSTICA <span className="article-category-dot">·</span> COOPERAÇÃO INTERNACIONAL</span>
            <h1 id="article-full-title">Vuka Logística Reforça Presença Internacional em Missão Empresarial da CTA aos EUA</h1>
            <p className="article-page-standfirst">Em representação da Vuka Logística & Serviços, Salvador Maiaze participou numa missão empresarial da CTA, dedicada ao diálogo, à partilha de experiências e à identificação de oportunidades de cooperação.</p>
            <div className="article-meta"><span>Vuka Logística & Serviços</span><span className="article-meta-divider" aria-hidden="true"/><span>Felisberto Ruco</span></div>
          </header>
          <figure className="article-page-figure">
            <img className="article-featured" src={salvadorMissaoFoto} alt="Delegação empresarial moçambicana durante missão aos Estados Unidos da América, com a bandeira de Moçambique" />
            <figcaption>Delegação empresarial moçambicana durante a missão aos Estados Unidos da América.</figcaption>
          </figure>
          <div className="article-content article-page-content">
            <p className="article-lead">O empresário moçambicano Salvador Maiaze participou, em representação da Vuka Logística & Serviços, numa missão empresarial aos Estados Unidos da América, integrada por uma delegação da Confederação das Associações Económicas de Moçambique (CTA), com o propósito de promover o diálogo empresarial, a partilha de experiências e a identificação de novas oportunidades de cooperação económica internacional.</p>
            <p>A participação de Salvador Maiaze nesta iniciativa representa um passo importante no posicionamento institucional da Vuka Logística & Serviços, empresa integrante do Grupo Mbewu, num contexto de crescente procura de parcerias estratégicas e de oportunidades de expansão para o sector privado moçambicano.</p>
            <p>A missão proporcionou um espaço de aproximação entre representantes empresariais, favorecendo o intercâmbio de conhecimentos e a exploração de possibilidades de colaboração entre empresas moçambicanas e potenciais parceiros internacionais.</p>
            <h3>Vuka Logística Reforça Presença em Iniciativas de Cooperação Internacional</h3>
            <p>A integração de Salvador Maiaze na delegação empresarial reflecte o interesse da Vuka Logística & Serviços em acompanhar iniciativas de internacionalização e estabelecer contactos que possam contribuir para o desenvolvimento das suas actividades.</p>
            <p>A presença da empresa nesta missão insere-se numa perspectiva de crescimento sustentada pela identificação de oportunidades de negócio, pelo estabelecimento de relações institucionais e pela aproximação a mercados internacionais.</p>
            <p>Numa publicação nas redes sociais, Salvador Maiaze manifestou satisfação pela oportunidade de integrar a delegação moçambicana.</p>
            <blockquote>"Honrado por fazer parte da Delegação Empresarial Moçambicana nesta missão aos Estados Unidos da América, um espaço de diálogo, partilha de experiências e criação de novas oportunidades para o desenvolvimento económico do nosso País", afirmou.</blockquote>
            <p>O empresário destacou igualmente a importância da cooperação internacional para o desenvolvimento económico nacional.</p>
            <blockquote>"Continuamos a acreditar que o futuro constrói-se com visão, trabalho, cooperação e pontes que aproximam Moçambique do mundo", acrescentou.</blockquote>
            <h3>Novas Perspectivas Para o Sector Privado Moçambicano</h3>
            <p>A participação em missões empresariais internacionais constitui uma oportunidade para as empresas nacionais conhecerem diferentes práticas de gestão, estabelecerem contactos e identificarem potenciais áreas de colaboração.</p>
            <p>Para a Vuka Logística & Serviços, a presença nesta iniciativa representa uma oportunidade de aproximação a novos parceiros e de acompanhamento das tendências internacionais nos sectores da logística, transporte e serviços.</p>
            <p>A integração de Salvador Maiaze na delegação da CTA reforça, igualmente, a presença de empresas do Grupo Mbewu em espaços de relacionamento empresarial e cooperação económica, contribuindo para a projecção institucional do Grupo e das suas actividades.</p>
            <p>Embora a missão tenha proporcionado contactos e oportunidades de diálogo, eventuais parcerias ou investimentos resultantes da iniciativa dependerão de desenvolvimentos posteriores.</p>
          </div>
        </div>
        <aside className="article-related" aria-labelledby="related-title">
          <div className="article-related-heading">
            <span className="eyebrow dark-eyebrow">ACTUALIDADE DO GRUPO</span>
            <h2 id="related-title">Outros acontecimentos</h2>
          </div>
          <div className="article-related-grid">
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('btv')}>
              <div className="related-card-visual related-card-photo"><img src="https://supabase.datacenterhub.tech/storage/v1/object/public/bnews-media/library/1790190834153-422c6627-btv-easy-resize.webp" alt="BTV e TVCABO assinam acordo" loading="lazy"/><span>BTV · EXPANSÃO</span></div>
              <div className="related-card-copy"><span>NOTÍCIAS</span><h3>BTV reforça presença nacional com entrada na TVCABO</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('forum')}>
              <div className="related-card-visual related-card-photo"><img src={forumPortugalFoto} alt="Fórum Económico Portugal–Moçambique" loading="lazy"/><span>PORTUGAL · MOÇAMBIQUE</span></div>
              <div className="related-card-copy"><span>COOPERAÇÃO INTERNACIONAL</span><h3>Portugal–Moçambique: Vuka Logística Explora Perspectivas de Cooperação Empresarial</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
          </div>
        </aside>
      </article>
      </> : <>
      <article className="article-page-article">
        <div className="article-shell">
        <header className="article-page-heading">
          <span className="article-category">BTV <span className="article-category-dot">·</span> EXPANSÃO</span>
          <h1 id="article-full-title">BTV reforça presença nacional com entrada na TVCABO</h1>
          <p className="article-page-standfirst">O canal alargou a sua distribuição ao integrar a grelha da TVCABO na posição 323, aproximando a programação de mais famílias moçambicanas.</p>
          <div className="article-meta"><span>23 de Setembro de 2026</span><span className="article-meta-divider" aria-hidden="true"/> <span>Felisberto Ruco</span></div>
        </header>
        <figure className="article-page-figure">
          <img className="article-featured" src="https://supabase.datacenterhub.tech/storage/v1/object/public/bnews-media/library/1790190834153-422c6627-btv-easy-resize.webp" alt="BTV anuncia a sua entrada na grelha da TVCABO" />
          <figcaption>Expansão da BTV à televisão por subscrição, através da TVCABO.</figcaption>
        </figure>
        <div className="article-content article-page-content">
            <p className="article-lead">A BTV passou a integrar a grelha da TVCABO em 1 de Outubro de 2026, na posição 323, ampliando a distribuição dos seus conteúdos e reforçando a presença da produção televisiva moçambicana.</p>
            <p>O alargamento da emissão à televisão por subscrição representa uma nova fase no percurso da BTV. Até então, a estação chegava ao público essencialmente através das plataformas digitais, onde mantém uma programação regular desde Abril, dedicada à informação, cultura, entretenimento e temas da realidade nacional.</p>
            <p>Para Salvador Maiaze, Presidente do Conselho de Administração da BTV, a integração na TVCABO concretiza um objectivo preparado ao longo dos últimos meses e permite aproximar o canal de mais famílias moçambicanas.</p>
            <blockquote>"Este, para nós, é um passo muito significativo. É um sonho realizado e estamos felizes", afirmou Salvador Maiaze.</blockquote>
            <p>O responsável convidou os telespectadores a acompanhar os conteúdos do canal através da nova plataforma, sublinhando a importância de disponibilizar a programação também nos televisores das famílias.</p>
            <h3>Mais espaço para a produção nacional</h3>
            <p>O Director-Geral da TVCABO Moçambique, Humberto Barros, assinalou que a entrada da BTV está alinhada com a estratégia da operadora de dar maior visibilidade aos canais e às produções nacionais.</p>
            <blockquote>"A entrada do canal na nossa grelha programática reforça aquilo que tem sido o nosso trajecto ao longo dos anos, especialmente nos últimos anos: dar espaço ao conteúdo nacional e à produção local", declarou Humberto Barros.</blockquote>
            <p>A parceria alarga os meios de acesso à informação e ao entretenimento produzidos em Moçambique, ao mesmo tempo que fortalece a presença da BTV no mercado televisivo nacional.</p>


        </div>
        </div>
        <aside className="article-related" aria-labelledby="related-title">
          <div className="article-related-heading">
            <span className="eyebrow dark-eyebrow">ACTUALIDADE DO GRUPO</span>
            <h2 id="related-title">Outros acontecimentos</h2>
          </div>
          <div className="article-related-grid">
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('vuka')}>
              <div className="related-card-visual related-card-photo"><img src={salvadorMissaoFoto} alt="Delegação empresarial moçambicana" loading="lazy"/><span>VUKA LOGÍSTICA · CTA</span></div>
              <div className="related-card-copy"><span>COOPERAÇÃO INTERNACIONAL</span><h3>Vuka Logística Reforça Presença Internacional em Missão Empresarial da CTA aos EUA</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
            <button className="related-card related-card-link" type="button" onClick={() => openArticle('forum')}>
              <div className="related-card-visual related-card-photo"><img src={forumPortugalFoto} alt="Fórum Económico Portugal–Moçambique" loading="lazy"/><span>PORTUGAL · MOÇAMBIQUE</span></div>
              <div className="related-card-copy"><span>COOPERAÇÃO INTERNACIONAL</span><h3>Portugal–Moçambique: Vuka Logística Explora Perspectivas de Cooperação Empresarial</h3><p>Ler artigo completo <ArrowUpRight size={15}/></p></div>
            </button>
          </div>
        </aside>
      </article>      </>}
    </main>}
    <footer id="contactos" className="footer"><div className="container">
      <div data-reveal className="footer-grid"><div><Logo footer/><p>Um grupo moçambicano. Diferentes sectores. Uma visão comum.</p></div><div><span className="footer-title">Explorar</span><a href="#sobre">Sobre o Grupo</a><a href="#empresas">Empresas</a><a href="#actuacao">Áreas de actuação</a><a href="#presidencia">Presidência</a><a href="#actualidade">Actualidade</a></div><div><span className="footer-title">Contactos</span><span className="footer-line"><MapPin size={16}/> Av. Paulo Samuel Kamkhomba, nº 1441, 1º Andar, Malhangalene, Maputo</span><a className="footer-line" href="mailto:info@grupombewu.co.mz"><Mail size={16}/> info@grupombewu.co.mz</a><a className="footer-line" href="tel:+258858000800"><Phone size={16}/> +258 85 800 0800</a></div><div><span className="footer-title">Grupo Mbewu</span><p>Conheça as marcas que fazem parte do nosso universo empresarial.</p></div></div>
      <nav className="footer-legal" aria-label="Informações legais e privacidade">
        <button type="button" onClick={() => openLegal('privacidade')}>Política de Privacidade</button>
        <button type="button" onClick={() => openLegal('cookies')}>Política de Cookies</button>
        <button type="button" onClick={() => openLegal('termos')}>Termos de Utilização</button>
        <button type="button" onClick={openCookiePreferences}>Gerir cookies</button>
      </nav>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Grupo Mbewu. Todos os direitos reservados.</span><span>Desenvolvido com visão de futuro.</span></div>
    </div></footer>
    <CookieNotice onNavigate={openLegal} openRequest={cookiePreferencesRequest}/>
  </>
}