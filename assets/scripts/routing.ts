function setContents(html: string, title?: string): void {
  const main = document.getElementById('main');

  if (main) {
    main.innerHTML = html;
  }

  document.title = title || 'Hybrid Frameworkless SPA Concept';
  setLinks();
}

async function clickLink(link: HTMLAnchorElement): Promise<void> {
  const pageLoader = document.getElementById('pageLoader');
  let pageLoaderTimeout: NodeJS.Timeout | undefined;

  if (pageLoader) {
    pageLoaderTimeout = setTimeout(() => {
      pageLoader.classList.remove('hidden');
      pageLoader.classList.add('loading');
      clearTimeout(pageLoaderTimeout);
    }, 200);
  }

  try {
    const response = await fetch(`${link.href}?_partial`);

    if (response.status === 200) {
      const partialContents = await response.json();

      setContents(partialContents.html, partialContents.title);

      window.history.pushState({
        html: partialContents.html,
        title: partialContents.title,
        href: link.href,
      }, '', link.href);
    }
    else {
      throw new Error('The response code was not 200!');
    }
  }
  catch (error: any) {
    console.error(error);
    document.location = link.href;
  }
  finally {
    if (pageLoader) {
      if (pageLoaderTimeout) {
        clearTimeout(pageLoaderTimeout);
      }

      pageLoader.classList.add('hidden');
      pageLoader.classList.remove('loading');
    }
  }
}

function setLinks(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-link]');

  if (links && links.length > 0) {
    links.forEach(link => link.addEventListener('click', async (e: Event) => {
      e.preventDefault();
      await clickLink(link);
    }));
  }
}

const originalHtml = document.getElementById('main')?.innerHTML ?? 'An error occurred. Please reload the page.';
const originalTitle = document.title;

(function(): void {
  setLinks();

  addEventListener('popstate', (e: PopStateEvent) => {
    if (e.state?.html) {
      setContents(e.state.html, e.state.title);
    }
    else if (e.state?.href) {
      document.location = e.state.href;
    }
    else {
      setContents(originalHtml, originalTitle);
    }
  });
})();
