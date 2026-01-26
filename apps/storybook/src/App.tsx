import React, { useState, useEffect, lazy, Suspense } from 'react';

const appModules = import.meta.glob('./apps/*/App.tsx');

const apps = Object.keys(appModules).reduce((acc, path) => {
  const appName = path.split('/')[2];
  acc[appName] = lazy(appModules[path] as () => Promise<any>);
  return acc;
}, {} as Record<string, React.LazyExoticComponent<any>>);

const App: React.FC = () => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (Object.keys(apps).includes(hash)) {
        setCurrentApp(hash);
      } else {
        setCurrentApp(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderApp = () => {
    if (currentApp) {
      const AppComponent = apps[currentApp];
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <AppComponent />
        </Suspense>
      );
    }

    return (
      <div>
        <h1>Available Applications</h1>
        <ul className="list-disc">
          {Object.keys(apps).map((appName) => (
            <li key={appName}>
              <a href={`#${appName}`}>{appName}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {renderApp()}
    </div>
  );
};

export default App;