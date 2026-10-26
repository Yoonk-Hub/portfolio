const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));

const projectDialog = document.querySelector("#project-dialog");
const projectDialogTitle = document.querySelector("#project-dialog-title");
const projectDialogDescription = document.querySelector("#project-dialog-description");
const projectDialogRole = document.querySelector("#project-dialog-role");
const projectDialogTechnologies = document.querySelector("#project-dialog-technologies");
const projectDialogResults = document.querySelector("#project-dialog-results");
const projectDialogClose = document.querySelector(".project-dialog-close");
let activeProjectCard = null;

// 카드에 저장된 예시 정보를 모달에 표시하고, 열릴 때 닫기 버튼에 포커스를 둡니다.
const openProjectDialog = (card) => {
  const title = card.querySelector("h3");
  const description = card.querySelector(".project-info p");
  const { role, technologies, results } = card.dataset;

  if (
    !projectDialog || !projectDialogTitle || !projectDialogDescription ||
    !projectDialogRole || !projectDialogTechnologies || !projectDialogResults ||
    !projectDialogClose || !title || !description || !role || !technologies || !results
  ) {
    throw new Error("프로젝트 상세 정보를 표시하는 데 필요한 요소를 찾을 수 없습니다.");
  }

  projectDialogTitle.textContent = title.textContent.trim();
  projectDialogDescription.textContent = description.textContent.trim();
  projectDialogRole.textContent = role;
  projectDialogTechnologies.textContent = technologies;
  projectDialogResults.textContent = results;
  activeProjectCard = card;
  projectDialog.showModal();
  projectDialogClose.focus();
};

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProjectDialog(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDialog(card);
    }
  });
});

projectDialogClose?.addEventListener("click", () => projectDialog.close());
projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
// ESC 키를 포함해 모달이 닫히면, 열었던 카드로 키보드 포커스를 되돌립니다.
projectDialog?.addEventListener("close", () => {
  activeProjectCard?.focus();
  activeProjectCard = null;
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "메시지가 준비되었습니다. 곧 답변드릴게요!";
  contactForm.reset();
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
