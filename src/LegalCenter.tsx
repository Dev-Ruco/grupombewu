import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Cookie, LockKeyhole, Mail, Settings2, ShieldCheck, X } from 'lucide-react'
import './legal.css'

export type LegalPage = 'privacidade' | 'cookies' | 'termos'

const CHOICE_KEY = 'mbewu_privacy_choice_v1'
const titles: Record<LegalPage, string> = {
  privacidade: 'Política de Privacidade',
  cookies: 'Política de Cookies',
  termos: 'Termos de Utilização',
}

function saveNecessaryPreference() {
  try {
    window.localStorage.setItem(CHOICE_KEY, JSON.stringify({ choice: 'necessary', date: new Date().toISOString(), version: 1 }))
  } catch {
    // O site continua funcional se o navegador bloquear o armazenamento.
  }
}

function hasSavedPreference() {
  try {
    const saved = window.localStorage.getItem(CHOICE_KEY)
    return Boolean(saved && JSON.parse(saved)?.choice === 'necessary')
  } catch {
    return false
  }
}

export function CookieNotice({ onNavigate, openRequest }: { onNavigate: (page: LegalPage) => void, openRequest: number }) {
  const [showBanner, setShowBanner] = useState(() => !hasSavedPreference())
  const [showPreferences, setShowPreferences] = useState(false)
  useEffect(() => { if (openRequest > 0) setShowPreferences(true) }, [openRequest])

  const savePreferences = () => {
    saveNecessaryPreference()
    setShowBanner(false)
    setShowPreferences(false)
  }

  useEffect(() => {
    if (!showPreferences) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowPreferences(false)
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [showPreferences])

  return <>
    {showBanner && !showPreferences && <aside className="cookie-banner" aria-label="Aviso sobre cookies e privacidade">
      <div className="cookie-banner-icon" aria-hidden="true"><Cookie size={23}/></div>
      <div className="cookie-banner-copy">
        <strong>A sua privacidade importa.</strong>
        <p>Este website utiliza apenas armazenamento técnico para guardar a sua preferência de privacidade. Não estão configurados cookies de publicidade ou de análise de visitantes. <button type="button" className="cookie-inline-link" onClick={() => onNavigate('cookies')}>Saiba mais</button>.</p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-btn cookie-btn-secondary" onClick={() => setShowPreferences(true)}>Ver preferências</button>
        <button type="button" className="cookie-btn cookie-btn-primary" onClick={savePreferences}>Continuar com necessários <Check size={15}/></button>
      </div>
    </aside>}
    {showPreferences && <div className="cookie-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setShowPreferences(false) }}>
      <section role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title" className="cookie-preferences">
        <div className="cookie-preferences-top">
          <div className="cookie-modal-icon"><Settings2 size={19}/></div>
          <button type="button" onClick={() => setShowPreferences(false)} aria-label="Fechar preferências de privacidade" className="cookie-modal-close"><X size={20}/></button>
        </div>
        <h2 id="cookie-preferences-title">Preferências de privacidade</h2>
        <p>Actualmente, este site não utiliza ferramentas de estatística ou publicidade. O armazenamento técnico abaixo serve exclusivamente para memorizar esta escolha.</p>
        <div className="cookie-preference-row">
          <span className="cookie-preference-icon"><LockKeyhole size={19}/></span>
          <div><strong>Estritamente necessários</strong><small>Guardar a sua preferência neste navegador.</small></div>
          <span className="cookie-preference-status">Sempre activos</span>
        </div>
        <div className="cookie-preference-row">
          <span className="cookie-preference-icon"><ShieldCheck size={19}/></span>
          <div><strong>Estatísticas e publicidade</strong><small>Não estão instalados rastreadores destas categorias.</small></div>
          <span className="cookie-preference-status muted">Não utilizados</span>
        </div>
        <div className="cookie-preferences-links">
          <button type="button" onClick={() => { setShowPreferences(false); onNavigate('privacidade') }}>Política de Privacidade</button>
          <button type="button" onClick={() => { setShowPreferences(false); onNavigate('cookies') }}>Política de Cookies</button>
        </div>
        <button type="button" className="cookie-btn cookie-btn-primary cookie-save" onClick={savePreferences}>Guardar preferências <Check size={16}/></button>
      </section>
    </div>}
  </>
}

export function LegalContent({ page, onBack, onNavigate, onOpenPreferences }: {
  page: LegalPage
  onBack: () => void
  onNavigate: (page: LegalPage) => void
  onOpenPreferences: () => void
}) {
  return <main className="legal-page">
    <div className="legal-page-top">
      <div className="container">
        <button type="button" className="legal-back" onClick={onBack}><ArrowLeft size={17}/> Voltar ao website</button>
        <span>GRUPO MBEWU / INFORMAÇÃO INSTITUCIONAL</span>
      </div>
    </div>
    <div className="legal-page-layout">
      <header className="legal-heading">
        <span className="legal-eyebrow">INFORMAÇÃO E TRANSPARÊNCIA</span>
        <h1>{titles[page]}</h1>
        <p>Informações sobre a utilização deste website e a protecção dos dados dos seus visitantes.</p>
        <time dateTime="2026-11-09">Última actualização: 9 de Novembro de 2026</time>
      </header>
      <div className="legal-content">
        {page === 'privacidade' && <>
          <h2>1. Quem somos</h2>
          <p>Este website é a presença institucional do Grupo Mbewu, com sede de contacto na Av. Paulo Samuel Kamkhomba, nº 1441, 1.º Andar, Bairro da Malhangalene, Maputo, Moçambique. Para questões relacionadas com privacidade e informações do website, pode escrever para <a href="mailto:info@grupombewu.co.mz">info@grupombewu.co.mz</a>.</p>
          <h2>2. Informações que podem ser tratadas</h2>
          <p>Não existe neste website um formulário de registo ou de envio de dados pessoais. Se nos contactar por correio electrónico ou telefone, poderemos receber as informações que decidir fornecer, nomeadamente o nome, contacto e conteúdo da mensagem, para responder ao seu pedido.</p>
          <p>O alojamento e os serviços técnicos envolvidos na disponibilização do website podem registar dados técnicos de acesso, como endereço IP, data, hora, tipo de navegador e informações necessárias à segurança e ao funcionamento do serviço.</p>
          <h2>3. Finalidades e conservação</h2>
          <p>As informações de contacto são utilizadas para responder a pedidos, dar seguimento a comunicações e gerir o relacionamento institucional. Conservamo-las durante o período necessário para esse fim ou conforme obrigações aplicáveis. Os registos técnicos podem seguir os prazos definidos pelos respectivos prestadores de serviço.</p>
          <h2>4. Serviços e conteúdos externos</h2>
          <p>O website é disponibilizado através de serviços de alojamento e utiliza fontes tipográficas externas do Google Fonts, bem como fotografias que podem ser carregadas a partir de serviços de armazenamento de imagens. Ao visitar páginas com estes recursos, os respectivos fornecedores podem receber informações técnicas do seu dispositivo. Ao abrir ligações para websites de empresas do Grupo ou plataformas externas, aplicam-se também as respectivas políticas de privacidade.</p>
          <h2>5. Cookies e armazenamento local</h2>
          <p>O código actual do website não inclui ferramentas próprias de análise de audiência ou publicidade comportamental. Utilizamos o armazenamento local do navegador apenas para memorizar a escolha apresentada no aviso de privacidade. Saiba mais na <button type="button" className="legal-inline-button" onClick={() => onNavigate('cookies')}>Política de Cookies</button>.</p>
          <h2>6. Os seus pedidos</h2>
          <p>Se pretender esclarecer como tratamos informações que nos enviou, solicitar a sua correcção ou pedir a sua eliminação, quando aplicável, contacte <a href="mailto:info@grupombewu.co.mz">info@grupombewu.co.mz</a>. Cada pedido será analisado de acordo com as circunstâncias e as regras aplicáveis.</p>
          <h2>7. Actualizações</h2>
          <p>Esta política poderá ser revista sempre que os serviços ou as funcionalidades do website sejam alterados. A data da última actualização será indicada nesta página.</p>
        </>}
        {page === 'cookies' && <>
          <h2>1. O que são cookies?</h2>
          <p>Cookies são pequenos ficheiros que um website pode guardar no navegador. Existem também mecanismos semelhantes, como o armazenamento local, que permitem memorizar algumas preferências do visitante.</p>
          <h2>2. O que utilizamos neste website?</h2>
          <p>Na configuração actual, o Grupo Mbewu não integra ferramentas próprias de análise estatística, publicidade personalizada ou acompanhamento de visitantes. Para evitar apresentar repetidamente o aviso de privacidade, guardamos apenas a seguinte preferência no armazenamento local do navegador:</p>
          <div className="legal-data-item"><code>mbewu_privacy_choice_v1</code><span>Memoriza a utilização das funcionalidades estritamente necessárias e a data da escolha. A informação permanece no navegador até ser apagada ou alterada.</span></div>
          <h2>3. Serviços de terceiros</h2>
          <p>O website utiliza recursos externos, como o Google Fonts e serviços de alojamento de imagens. Estes fornecedores poderão tratar dados técnicos ou adoptar os seus próprios mecanismos de armazenamento, de acordo com as respectivas condições. O Grupo Mbewu não controla os cookies instalados por websites externos quando o visitante segue ligações para outras plataformas.</p>
          <h2>4. Como controlar estas preferências?</h2>
          <p>Pode reabrir o painel de preferências através da opção «Gerir cookies» no rodapé. Também pode eliminar o armazenamento local ou os cookies nas definições do seu navegador. A eliminação da preferência fará reaparecer o aviso numa visita posterior.</p>
          <button type="button" className="legal-manage-button" onClick={onOpenPreferences}><Settings2 size={17}/> Gerir preferências de privacidade</button>
          <h2>5. Alterações futuras</h2>
          <p>Se forem acrescentados serviços que dependam de cookies ou tecnologias não essenciais, o aviso e a presente política deverão ser actualizados, e essas tecnologias deverão respeitar as escolhas necessárias dos visitantes antes de serem activadas.</p>
        </>}
        {page === 'termos' && <>
          <h2>1. Objectivo do website</h2>
          <p>O website do Grupo Mbewu apresenta informação institucional sobre o Grupo, as suas empresas, áreas de actividade, iniciativas e acontecimentos relevantes. Os conteúdos têm natureza informativa e não constituem, por si só, propostas contratuais ou garantias de prestação de serviços.</p>
          <h2>2. Conteúdos e actualizações</h2>
          <p>Procuramos apresentar informações correctas e actualizadas, mas as notícias, imagens, descrições e informações sobre actividades podem ser modificadas ou corrigidas. A informação histórica deve ser interpretada à luz da data e do contexto da respectiva publicação.</p>
          <h2>3. Marcas e direitos de utilização</h2>
          <p>Os nomes, logótipos, fotografias, elementos gráficos e conteúdos disponibilizados pertencem aos respectivos titulares ou são utilizados no âmbito da comunicação institucional. Não é autorizada a reprodução comercial ou a utilização das marcas sem a necessária permissão dos titulares, salvo quando legalmente admitida.</p>
          <h2>4. Ligações externas</h2>
          <p>Algumas páginas contêm ligações para websites das empresas do Grupo ou de outras entidades. Estes serviços são geridos pelos respectivos responsáveis e podem adoptar condições de utilização e políticas de privacidade próprias.</p>
          <h2>5. Utilização responsável</h2>
          <p>O visitante compromete-se a utilizar o website sem comprometer o seu funcionamento ou os direitos de outras pessoas ou entidades. A disponibilidade do website poderá sofrer interrupções por manutenção, actualizações ou razões técnicas.</p>
          <h2>6. Contactos</h2>
          <p>Para informações, esclarecimentos ou comunicação de erros, contacte <a href="mailto:info@grupombewu.co.mz">info@grupombewu.co.mz</a> ou <a href="tel:+258858000800">+258 85 800 0800</a>.</p>
        </>}
      </div>
      <nav className="legal-other-links" aria-label="Outras informações legais">
        <span>CONSULTAR TAMBÉM</span>
        {(Object.keys(titles) as LegalPage[]).filter(p => p !== page).map(p => <button key={p} type="button" onClick={() => onNavigate(p)}>{titles[p]} <ArrowLeft size={16}/></button>)}
      </nav>
      <div className="legal-contact"><Mail size={17}/><span>Dúvidas sobre privacidade? <a href="mailto:info@grupombewu.co.mz">info@grupombewu.co.mz</a></span></div>
    </div>
  </main>
}

export function getLegalPageFromHash(): LegalPage | null {
  switch (window.location.hash) {
    case '#politica-privacidade': return 'privacidade'
    case '#politica-cookies': return 'cookies'
    case '#termos-utilizacao': return 'termos'
    default: return null
  }
}

export function legalPageHash(page: LegalPage) {
  return page === 'privacidade' ? '#politica-privacidade' : page === 'cookies' ? '#politica-cookies' : '#termos-utilizacao'
}
