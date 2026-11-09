import { useEffect, useRef, useState } from 'react'
import btvLogo from './assets/logos/empresas/btv.png'
import mlcLogo from './assets/logos/empresas/maputo-luxury-cars.png'
import bnewsLogo from './assets/logos/empresas/bnews.png'
import bawitoLogo from './assets/logos/empresas/bawito-music-servicos.png'
import securityLogo from './assets/logos/empresas/24-7-security.png'
import vukaLogo from './assets/logos/empresas/vuka-logistica-servicos.png'
import presidenteFoto from './assets/images/presidente/presidente.jpg'
import { ArrowRight, ArrowUpRight, CarFront, ChevronDown, Handshake, Layers3, Mail, MapPin, Phone, Menu, Music2, Play, ShieldCheck, Truck, Tv, X, CheckCircle2, Target, Instagram, Facebook, Youtube } from 'lucide-react'

const companies = [
  { id: 'btv', name: 'BTV', category: 'MEDIA & TELEVISÃO', short: 'Televisão, conteúdos audiovisuais, informação e entretenimento.', logo: btvLogo, accent: 'pink' },
  { id: 'mlc', name: 'Maputo Luxury Cars', category: 'MOBILIDADE PREMIUM', short: 'Serviços de transporte com motorista e soluções de mobilidade premium.', logo: mlcLogo, accent: 'copper', url: 'https://maputoluxurycars.co.mz/' },
  { id: 'bnews', name: 'BNEWS', category: 'INFORMAÇÃO', short: 'Notícias, actualidade e conteúdos informativos.', logo: bnewsLogo, accent: 'red', url: 'https://bnews.co.mz/' },
  { id: 'bawito', name: 'Bawito Music & Serviços', category: 'MÚSICA & EVENTOS', short: 'Gestão artística, produção e serviços ligados ao entretenimento.', logo: bawitoLogo, accent: 'blue' },
  { id: 'security', name: '24/7 Security', category: 'SEGURANÇA', short: 'Serviços de segurança e protecção de pessoas e património.', logo: securityLogo, accent: 'scarlet' },
  { id: 'vuka', name: 'Vuka Logística & Serviços', category: 'LOGÍSTICA', short: 'Soluções de logística, transporte e serviços operacionais.', logo: vukaLogo, accent: 'royal' },
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
function CompanyCard({company}:{company:typeof companies[number]}) {
  const website = 'url' in company ? company.url : undefined
  return <article data-reveal className={'company-card company-' + company.id}>
    <div className="company-logo-stage">
      <img className="company-logo-art" src={company.logo} alt={`Logótipo da ${company.name}`} loading="lazy" decoding="async"/>
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
  const [articleOpen,setArticleOpen] = useState(() => window.location.hash === '#artigo-btv-tvcabo')
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
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
        else entry.target.classList.remove('is-visible')
      })
    }, {threshold: .12, rootMargin: '0px 0px -28px 0px'})
    targets.forEach(el => observer.observe(el))
    document.documentElement.classList.add('motion-ready')
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  },[])
  useEffect(() => {
    const syncLocation = () => setArticleOpen(window.location.hash === '#artigo-btv-tvcabo')
    window.addEventListener('popstate', syncLocation)
    window.addEventListener('hashchange', syncLocation)
    return () => {
      window.removeEventListener('popstate', syncLocation)
      window.removeEventListener('hashchange', syncLocation)
    }
  }, [])
  const openArticle = () => {
    window.history.pushState({article:'btv-tvcabo'}, '', '#artigo-btv-tvcabo')
    setArticleOpen(true)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const closeArticle = () => {
    window.history.pushState({}, '', '#actualidade')
    setArticleOpen(false)
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
    {!articleOpen ? <main>
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
            <p className="president-intro">À frente do Grupo Mbewu, Salvador Pedro Maiaze representa a liderança institucional de uma organização que reúne empresas de diferentes sectores de actividade.</p>
            <p>Esta secção apresenta a Presidência do Grupo. O percurso profissional e a mensagem institucional do Presidente serão acrescentados após validação dos respectivos conteúdos.</p>
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
              {label:'PROJECTOS',heading:'Espaço reservado para projectos e iniciativas',number:'02',icon:Layers3,date:null,excerpt:null,image:null,url:null},
              {label:'ACTIVIDADES',heading:'Espaço reservado para eventos e realizações',number:'03',icon:Handshake,date:null,excerpt:null,image:null,url:null},
            ].map(item => <article className={'news-card' + (item.url ? ' news-card-published' : '')} key={item.number}>
              <div className="news-card-media">
                {item.image ? <img className="news-card-image" src={item.image} alt="Anúncio da chegada da BTV à grelha da TVCABO" loading="lazy" decoding="async"/> : <item.icon size={56} strokeWidth={1.15} aria-hidden="true"/>}
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
              {item.url && <button className="news-card-hitarea" type="button" onClick={openArticle} aria-label={'Ler artigo completo: ' + item.heading}/>}
            </article>)}
          </div>
          <p className="news-disclaimer">Os restantes cartões serão actualizados à medida que forem disponibilizados novos artigos e fotografias.</p>
        </div>
      </section>
    </main> : <main className="article-page" id="artigo-btv" aria-labelledby="article-full-title">
      <div className="article-page-top">
        <div className="container article-page-nav">
          <button type="button" className="article-back" onClick={closeArticle}><ArrowRight size={19} className="article-back-icon"/> Voltar às notícias</button>
          <span className="article-breadcrumb">GRUPO MBEWU <span>/</span> ACTUALIDADE</span>
        </div>
      </div>
      <article className="article-page-article">
        <header className="article-page-heading">
          <span className="article-category">BTV <span className="article-category-dot">·</span> EXPANSÃO</span>
          <h1 id="article-full-title">BTV reforça presença nacional com entrada na TVCABO</h1>
          <p className="article-page-standfirst">O canal alargou a sua distribuição ao integrar a grelha da TVCABO na posição 323, aproximando a programação de mais famílias moçambicanas.</p>
          <div className="article-meta"><span>23 de Setembro de 2026</span><span className="article-meta-divider" aria-hidden="true"/> <span>BNEWS · Délio Timane</span></div>
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
        <aside className="article-related" aria-labelledby="related-title">
          <div className="article-related-heading">
            <span className="eyebrow dark-eyebrow">ACTUALIDADE DO GRUPO</span>
            <h2 id="related-title">Outros acontecimentos</h2>
            <p>Novas notícias e iniciativas das empresas do Grupo Mbewu serão apresentadas aqui.</p>
          </div>
          <div className="article-related-grid">
            <article className="related-card">
              <div className="related-card-visual"><Layers3 size={38} strokeWidth={1.25} aria-hidden="true"/><span>PROJECTOS</span></div>
              <div className="related-card-copy"><span>EM PREPARAÇÃO</span><h3>Próximos projectos e iniciativas do Grupo</h3><p>Este espaço será actualizado com um novo artigo.</p></div>
            </article>
            <article className="related-card">
              <div className="related-card-visual"><Handshake size={38} strokeWidth={1.25} aria-hidden="true"/><span>ACTIVIDADES</span></div>
              <div className="related-card-copy"><span>EM PREPARAÇÃO</span><h3>Novas actividades e realizações</h3><p>Este espaço será actualizado com um novo artigo.</p></div>
            </article>
          </div>
        </aside>
      </article>
    </main>}
    <footer id="contactos" className="footer"><div className="container">
      <div data-reveal className="footer-grid"><div><Logo footer/><p>Um grupo moçambicano. Diferentes sectores. Uma visão comum.</p></div><div><span className="footer-title">Explorar</span><a href="#sobre">Sobre o Grupo</a><a href="#empresas">Empresas</a><a href="#actuacao">Áreas de actuação</a><a href="#presidencia">Presidência</a><a href="#actualidade">Actualidade</a></div><div><span className="footer-title">Contactos</span><span className="footer-line"><MapPin size={16}/> Av. Paulo Samuel Kamkhomba, nº 1441, 1º Andar, Malhangalene, Maputo</span><a className="footer-line" href="mailto:info@grupombewu.co.mz"><Mail size={16}/> info@grupombewu.co.mz</a><a className="footer-line" href="tel:+258858000800"><Phone size={16}/> +258 85 800 0800</a></div><div><span className="footer-title">Grupo Mbewu</span><p>Conheça as marcas que fazem parte do nosso universo empresarial.</p></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Grupo Mbewu. Todos os direitos reservados.</span><span>Desenvolvido com visão de futuro.</span></div>
    </div></footer>
  </>
}