const projects = [
  {
    name: "OpenBook",
    lane: "agent",
    visibility: "public",
    stack: "Python",
    description:
      "Local-first, provider-agnostic memory and RAG system for coding agents.",
    url: "https://github.com/heyyykk3/Openbook",
  },
  {
    name: "Jarvis",
    lane: "desktop",
    visibility: "public",
    stack: "Python",
    description: "Desktop assistant source focused on local automation.",
    url: "https://github.com/heyyykk3/jarvis",
  },
  {
    name: "MCP Servers",
    lane: "agent",
    visibility: "public",
    stack: "TypeScript",
    description: "Public MCP server work for app and data integrations.",
    url: "https://github.com/DevFortress-Inc/mcp-servers",
  },
  {
    name: "Athena Obsidian Plugin",
    lane: "agent",
    visibility: "public",
    stack: "TypeScript",
    description: "Obsidian plugin work for Athena-style agent workflows.",
    url: "https://github.com/DevFortress-Inc/Athena--Obsidian-Plugin",
  },
  {
    name: "Lyria Studio Hybrid",
    lane: "media",
    visibility: "public",
    stack: "TypeScript",
    description: "Second-generation Athena audio engine monorepo.",
    url: "https://github.com/DevFortress-Inc/Lyria-Studio-Hybrid",
  },
  {
    name: "Lyria Audio Core",
    lane: "media",
    visibility: "public",
    stack: "Python",
    description: "Core audio generation and DSP engine for Athena Lyria.",
    url: "https://github.com/DevFortress-Inc/lyria-audio-core",
  },
  {
    name: "Excalidraw Libraries",
    lane: "tools",
    visibility: "public",
    stack: "HTML",
    description: "Shared prefab libraries for Excalidraw workflows.",
    url: "https://github.com/DevFortress-Inc/excalidraw-libraries",
  },
  {
    name: "Nota",
    lane: "productivity",
    visibility: "private",
    stack: "TypeScript",
    description: "Local-first workspace for docs, canvas, calendar, and Drive workflows.",
  },
  {
    name: "Fin",
    lane: "mobile",
    visibility: "private",
    stack: "Expo",
    description: "Mobile finance and split-group workflows.",
  },
  {
    name: "Athena Shopify Custom Product Options",
    lane: "commerce",
    visibility: "private",
    stack: "Remix",
    description: "Shopify admin app and storefront customization widget.",
  },
  {
    name: "Athena Search App",
    lane: "commerce",
    visibility: "private",
    stack: "TypeScript",
    description: "Shopify search and chatbot app work.",
  },
  {
    name: "Shopify AI Page Builder",
    lane: "commerce",
    visibility: "private",
    stack: "TypeScript",
    description: "AI-assisted page-building workflows for Shopify merchants.",
  },
  {
    name: "Meet Add-ons",
    lane: "productivity",
    visibility: "private",
    stack: "JavaScript",
    description: "Google Meet add-ons with AI and workflow integrations.",
  },
  {
    name: "Elle AI",
    lane: "agent",
    visibility: "private",
    stack: "Svelte",
    description: "Internal AI web UI and local deployment workflows.",
  },
  {
    name: "Ari Agent",
    lane: "agent",
    visibility: "private",
    stack: "Python",
    description: "Agent runtime and desktop assistant experiments.",
  },
  {
    name: "Browser Local",
    lane: "desktop",
    visibility: "private",
    stack: "Electron",
    description: "Packaged browser automation app for macOS and Windows.",
  },
  {
    name: "Jarvis Local",
    lane: "desktop",
    visibility: "private",
    stack: "Tauri",
    description: "Local desktop assistant powered by Ollama, STT, and TTS.",
  },
  {
    name: "Athena Autopilot",
    lane: "desktop",
    visibility: "private",
    stack: "TypeScript",
    description: "Browser automation agent work for Athena.",
  },
  {
    name: "Athena App Builder",
    lane: "tools",
    visibility: "private",
    stack: "Swift",
    description: "Native app-building workflows and prototypes.",
  },
  {
    name: "Canada Transit MCP Server",
    lane: "data",
    visibility: "private",
    stack: "Python",
    description: "MCP server for Canadian public transit network data.",
  },
];

const projectGrid = document.querySelector("#projectGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#projectSearch");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

let activeFilter = "all";

function projectMatchesFilter(project) {
  if (activeFilter === "all") return true;
  if (activeFilter === "public" || activeFilter === "private") {
    return project.visibility === activeFilter;
  }
  return project.lane === activeFilter;
}

function projectMatchesSearch(project, query) {
  if (!query) return true;
  const haystack = `${project.name} ${project.lane} ${project.visibility} ${project.stack} ${project.description}`;
  return haystack.toLowerCase().includes(query.toLowerCase());
}

function renderProjects() {
  const query = searchInput.value.trim();
  const visibleProjects = projects.filter(
    (project) => projectMatchesFilter(project) && projectMatchesSearch(project, query),
  );

  projectGrid.innerHTML = visibleProjects
    .map((project) => {
      const link = project.url
        ? `<a href="${project.url}" aria-label="Open ${project.name} repository">Open repository</a>`
        : `<span>Private work</span>`;

      return `
        <article class="project-card">
          <div>
            <div class="project-meta">
              <span>${project.visibility}</span>
              <span>${project.lane}</span>
              <span>${project.stack}</span>
            </div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </div>
          <div>${link}</div>
        </article>
      `;
    })
    .join("");

  emptyState.hidden = visibleProjects.length > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderProjects();
  });
});

searchInput.addEventListener("input", renderProjects);

renderProjects();
