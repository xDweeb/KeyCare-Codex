import KeyCareApp from './pages/KeyCareApp';

const PUBLIC_APP_PATHS = new Set(['/app', '/privacy', '/terms']);

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';

  if (PUBLIC_APP_PATHS.has(pathname)) return <KeyCareApp />;

  window.location.replace(`/app${window.location.search}${window.location.hash}`);
  return null;
}

export default App;
