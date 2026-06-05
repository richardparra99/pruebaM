const form = document.getElementById("leadForm");
const formMessage = document.getElementById("formMessage");
const leadCount = document.getElementById("leadCount");

function loadLeads() {
  const leads = JSON.parse(localStorage.getItem("devsatori_leads")) || [];
  leadCount.textContent = leads.length;
  return leads;
}

function saveLead(lead) {
  const leads = loadLeads();
  leads.push(lead);
  localStorage.setItem("devsatori_leads", JSON.stringify(leads));
  leadCount.textContent = leads.length;
}

loadLeads();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const cargo = document.getElementById("cargo").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !empresa || !cargo || !correo) {
    formMessage.textContent = "Por favor completa los campos obligatorios.";
    formMessage.style.color = "#f87171";
    return;
  }

  const lead = {
    nombre,
    empresa,
    cargo,
    correo,
    mensaje,
    fecha: new Date().toLocaleString()
  };

  saveLead(lead);

  formMessage.textContent = "Solicitud enviada correctamente.";
  formMessage.style.color = "#4ade80";

  form.reset();

  console.log("Leads guardados:", JSON.parse(localStorage.getItem("devsatori_leads")));
});