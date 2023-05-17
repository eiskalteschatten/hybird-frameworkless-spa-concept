async function clickLink(link: HTMLAnchorElement): Promise<void> {
  const pageLoader = document.getElementById('pageLoader');

  if (pageLoader) {
    pageLoader.classList.remove('hidden');
    pageLoader.classList.add('loading');
  }

  try {
    const response = await fetch(`${link.href}?_partial`);

    if (response.status === 200) {
      const partialContents = await response.json();
      const main = document.getElementById('main');

      if (main) {
        main.innerHTML = partialContents.html;
      }

      document.title = partialContents.title || 'Hybrid Frameworkless SPA Concept';

      window.history.pushState({
        html: partialContents.html,
        title: partialContents.pageTitle,
      }, '', link.href);

      setLinks();
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
      pageLoader.classList.add('hidden');
      pageLoader.classList.remove('loading');
    }
  }
}

function setLinks(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[data-link]');

  links.forEach(link => link.addEventListener('click', async (e: Event) => {
    e.preventDefault();
    await clickLink(link);
  }));
}

(function(): void {
  setLinks();
})();
