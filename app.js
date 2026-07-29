const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add("show");
    io.unobserve(e.target);
  }
}), { threshold: .11 });

document.querySelectorAll(".reveal").forEach((e, i) => {
  e.style.transitionDelay = Math.min((i % 4) * 65, 195) + "ms";
  io.observe(e);
});

const nav = document.querySelector(".nav");
addEventListener("scroll", () => nav?.classList.toggle("scrolled", scrollY > 16), { passive: true });

const p = document.createElement("div");
p.className = "progress";
document.body.appendChild(p);
addEventListener("scroll", () => {
  const d = document.documentElement.scrollHeight - innerHeight;
  p.style.width = (d ? scrollY / d * 100 : 0) + "%";
}, { passive: true });

// Page transition effect
document.querySelectorAll("a[href]").forEach(a => {
  const h = a.getAttribute("href");
  if (h && h.endsWith(".html") && !h.startsWith("http") && !a.classList.contains("pending-action")) {
    a.addEventListener("click", e => {
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        document.body.style.transition = "opacity .22s, transform .22s, filter .22s";
        document.body.style.opacity = ".12";
        document.body.style.transform = "translateY(-7px)";
        document.body.style.filter = "blur(4px)";
        setTimeout(() => location.href = h, 210);
      }
    });
  }
});

// Toast notification for pending assets (Resume, Patent, Live Demos)
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = '<span class="toast-dot"></span><span class="toast-text"></span>';
    document.body.appendChild(toast);
  }
  toast.querySelector(".toast-text").textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pending-action").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const asset = el.getAttribute("data-asset") || "This asset";
      showToast(`${asset} is pending deployment. Available upon request.`);
    });
  });
});