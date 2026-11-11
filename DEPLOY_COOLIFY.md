# Publicação do Grupo Mbewu no servidor — Coolify

Este repositório contém agora um `Dockerfile` de duas fases: Node.js compila o React/Vite, e Nginx distribui os ficheiros estáticos (`dist/`) com porta interna **80**.

## 1. Criar uma aplicação no Coolify

1. Abrir o Coolify do servidor em que já corre o website do Mr Bow.
2. Criar uma **nova aplicação**, sem modificar a aplicação do Mr Bow:
   - **Projecto:** Grupo Mbewu (ou o projecto corporativo escolhido)
   - **Environment:** `production`
   - **Server:** `localhost`
   - **Source:** GitHub App ligada ao repositório, ou repositório público
   - **Repository:** `Dev-Ruco/grupombewu`
   - **Branch:** `main`
   - **Build Pack / Build Strategy:** **Dockerfile**
   - **Base Directory:** `/`
   - **Dockerfile Location:** `/Dockerfile` (ou `Dockerfile`, consoante a interface)
   - **Ports Exposes / Internal Port:** `80`
   - **Port Mappings:** deixar vazio (o proxy do Coolify encaminha o tráfego)
   - **Healthcheck:** `/healthz`, método GET, porta 80
3. Guardar a configuração e usar **Deploy**.
4. Nos Deployment Logs, confirmar compilação Vite concluída e container a correr. A rota `/healthz` deve responder `200 OK`.

## 2. Deploy automático a partir do GitHub

No website do Mr Bow foi utilizada a GitHub App `mrbow-coolify-deploy`, com acesso limitado ao repositório `Dev-Ruco/mrbow`.

Para reutilizar a mesma integração sem dar acesso à conta inteira:
1. Na instalação da GitHub App, adicionar **apenas** `Dev-Ruco/grupombewu` à lista de repositórios autorizados, mantendo `Dev-Ruco/mrbow`.
2. Regressar ao Coolify, actualizar a lista de repositórios e escolher `Dev-Ruco/grupombewu`.
3. Activar **Auto Deploy** para o branch `main` e confirmar o webhook da GitHub App.

Se for seleccionado **Public Repository** em vez da GitHub App, o clone público funciona, mas a publicação automática pode exigir configurar um webhook separadamente.

## 3. Testar antes de apontar o domínio

Primeiro, atribuir o domínio temporário fornecido pelo Coolify e testar:
- Página inicial, Hero, seis empresas e seis imagens
- Presidência e LinkedIn
- Três notícias completas e navegação `#artigo-...`
- Política de Privacidade, Política de Cookies e Termos
- Menu e fotografias em telemóvel
- Resposta da rota `/healthz`

O Nginx já inclui fallback para o `index.html`, cache longa para os assets gerados pelo Vite e cache curta para o HTML.

## 4. Domínio e HTTPS — apenas depois dos testes

Se for decidido usar `grupombewu.co.mz` e a zona DNS estiver sob controlo do Grupo:
- Definir o endereço A do domínio raiz para o IP do servidor Coolify: `72.62.187.114`.
- Configurar `www` como CNAME para `grupombewu.co.mz` (ou o endereço indicado pelo Coolify).
- Eliminar apenas registos web A/AAAA/CNAME conflitantes, **sem alterar MX, SPF, DKIM e demais registos de e-mail**.
- No Coolify, configurar `https://grupombewu.co.mz`, HTTPS automático (Let's Encrypt) e o alias `www`, se desejado.
- Confirmar que o domínio novo responde ao conteúdo actualizado antes de desligar o alojamento antigo.

**Não modificar a aplicação, domínio ou DNS de `mrbow.co.mz`.**

## 5. Actualizações seguintes

Todos os ficheiros e imagens permanecem no mesmo repositório GitHub.
Após configurar a GitHub App e o Auto Deploy, cada alteração aprovada no `main` pode desencadear a compilação e a publicação no Coolify.

A Vercel continua independente e pode ser mantida como alternativa durante a transição.

## Observações técnicas

- O site é estático e não necessita de base de dados ou variáveis de ambiente para os conteúdos actuais.
- O serviço `npm run preview` do Vite **não** é usado como servidor de produção.
- O container expõe apenas a porta interna 80; a exposição pública e o certificado TLS ficam a cargo do proxy do Coolify.
- O repositório ainda não contém `package-lock.json`, por isso o Dockerfile usa `npm install`. Quando um lockfile for criado, mudar para `npm ci`.
