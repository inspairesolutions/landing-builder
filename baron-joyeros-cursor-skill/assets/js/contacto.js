(() => {
  const form = document.querySelector("[data-contact-form]");
  const alertBox = document.querySelector("[data-form-alert]");
  const submitBtn = document.querySelector("[data-submit]");

  if (!(form instanceof HTMLFormElement)) return;

  // NOTE: Sitio 100% estático (HTML/CSS/JS). Sin backend no es posible "enviar" el formulario
  // al servidor; por eso generamos un borrador de correo (mailto) + copiamos el contenido.

  const setAlert = (kind, msg) => {
    if (!(alertBox instanceof HTMLElement)) return;
    alertBox.classList.remove("is-ok", "is-bad", "is-show");
    alertBox.textContent = msg;
    alertBox.classList.add("is-show", kind === "ok" ? "is-ok" : "is-bad");
  };

  const getField = (name) => form.elements.namedItem(name);
  const nombre = getField("nombre");
  const email = getField("email");
  const telefono = getField("telefono");
  const mensaje = getField("mensaje");

  const normalize = (v) => String(v ?? "").trim();
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = () => {
    const n = normalize(nombre?.value);
    const e = normalize(email?.value);
    const m = normalize(mensaje?.value);

    if (n.length < 2) return { ok: false, message: "Por favor, indica tu nombre." };
    if (!isEmail(e)) return { ok: false, message: "Por favor, indica un email válido." };
    if (m.length < 10) return { ok: false, message: "Cuéntanos un poco más (mínimo 10 caracteres)." };
    return { ok: true, message: "" };
  };

  const buildEmailBody = () => {
    const lines = [
      "Hola Barón Joyeros,",
      "",
      "Quería consultar lo siguiente:",
      normalize(mensaje?.value),
      "",
      "— Datos de contacto —",
      `Nombre: ${normalize(nombre?.value)}`,
      `Email: ${normalize(email?.value)}`,
      `Teléfono: ${normalize(telefono?.value) || "(no indicado)"}`,
      "",
      `Enviado desde: ${window.location.href}`
    ];
    return lines.join("\n");
  };

  const buildMailto = () => {
    const subject = "Consulta — Barón Joyeros (web)";
    const body = buildEmailBody();
    // Email real no proporcionado en el brief: mailto sin destinatario para que el usuario lo elija.
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setAlert("bad", "");
    if (alertBox instanceof HTMLElement) alertBox.classList.remove("is-show");

    const v = validate();
    if (!v.ok) {
      setAlert("bad", v.message);
      return;
    }

    if (submitBtn instanceof HTMLButtonElement) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Preparando…";
    }

    try {
      const body = buildEmailBody();
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(body);
      }

      const mailto = buildMailto();
      // Abrimos el cliente de correo (si está disponible).
      window.location.href = mailto;

      setAlert("ok", "Listo: hemos copiado tu mensaje y abierto un borrador de correo.");
    } catch (err) {
      setAlert("bad", "No se pudo preparar el envío. Puedes llamar al 916 593 932 o copiar el mensaje manualmente.");
      if (alertBox instanceof HTMLElement) {
        const a = document.createElement("a");
        a.href = buildMailto();
        a.textContent = "Abrir borrador de correo";
        a.className = "footer-link";
        a.style.marginTop = "8px";
        a.style.display = "inline-block";
        alertBox.appendChild(document.createElement("br"));
        alertBox.appendChild(a);
      }
    } finally {
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar";
      }
    }
  });
})();

