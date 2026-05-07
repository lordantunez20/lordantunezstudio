// ============================================================
// ADMIN PANEL
// ============================================================

const SESSION_KEY = 'lordantunez_admin_session';

function notify(message) {
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
        console.log(message);
    }
}

function adminError(error, fallback = 'Ocurrió un error en el panel') {
    console.error(error);
    notify(error?.message || fallback);
}

function updateDatabaseStatus() {
    const mode = window.AppDB?.getMode?.() || 'demo';
    const databaseStatus = document.getElementById('databaseStatus');
    const adminStatusLabel = document.getElementById('adminStatusLabel');

    if (databaseStatus) {
        databaseStatus.textContent = mode === 'supabase' ? 'Supabase Conectada' : 'Modo demo sin Supabase';
    }
    if (adminStatusLabel) {
        adminStatusLabel.textContent = mode === 'supabase' ? 'Online' : 'Demo';
    }
}

async function refreshPublicSections() {
    if (!window.AppRender) return;
    await Promise.all([
        window.AppRender.renderPortfolio?.(),
        window.AppRender.renderServices?.(),
        window.AppRender.renderTestimonials?.()
    ]);
}

async function refreshAdminSections() {
    await Promise.all([
        renderAdminProjects(),
        renderAdminServices(),
        renderAdminTestimonials(),
        renderAdminMessages()
    ]);
    await updateDbPreview();
    updateDatabaseStatus();
}

async function refreshAllSections() {
    await refreshPublicSections();
    await refreshAdminSections();
}

// ============================================================
// ADMIN RENDER FUNCTIONS
// ============================================================

async function renderAdminProjects() {
    const projects = await AppDB.getAllFromStore('projects');
    const tbody = document.getElementById('adminProjectsTable');
    if (!tbody) return;

    tbody.innerHTML = projects.map((item, i) => {
        const id = SiteUtils.normalizeId(item.id) || 0;
        return `
        <tr>
            <td class="text-white/30">${i + 1}</td>
            <td><img src="${SiteUtils.escapeHTML(SiteUtils.safeUrl(item.image))}" class="w-16 h-10 object-cover rounded-lg" alt=""></td>
            <td class="font-display font-bold text-white">${SiteUtils.escapeHTML(item.title)}</td>
            <td><span class="admin-badge">${SiteUtils.escapeHTML(item.tag)}</span></td>
            <td class="text-xs">${SiteUtils.escapeHTML(item.tags.slice(0, 2).join(', '))}${item.tags.length > 2 ? '...' : ''}</td>
            <td class="text-right">
                <button type="button" onclick="editProject(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-cyan/20 text-white/60 hover:text-brand-cyan transition-all mr-1" aria-label="Editar proyecto"><i class="fas fa-pen text-xs"></i></button>
                <button type="button" onclick="deleteProject(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all" aria-label="Eliminar proyecto"><i class="fas fa-trash text-xs"></i></button>
            </td>
        </tr>
        `;
    }).join('');

    const stat = document.getElementById('adminStatProjects');
    if (stat) stat.textContent = projects.length;
}

async function renderAdminServices() {
    const services = await AppDB.getAllFromStore('services');
    const tbody = document.getElementById('adminServicesTable');
    if (!tbody) return;

    tbody.innerHTML = services.map((item, i) => {
        const id = SiteUtils.normalizeId(item.id) || 0;
        return `
        <tr>
            <td class="text-white/30">${i + 1}</td>
            <td><i class="${SiteUtils.escapeHTML(SiteUtils.safeIconClass(item.icon))} text-brand-cyan"></i></td>
            <td class="font-display font-bold text-white">${SiteUtils.escapeHTML(item.title)}</td>
            <td><span class="admin-badge">${SiteUtils.escapeHTML(item.color)}</span></td>
            <td class="text-xs">${SiteUtils.escapeHTML(item.tags.join(', '))}</td>
            <td class="text-right">
                <button type="button" onclick="editService(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-cyan/20 text-white/60 hover:text-brand-cyan transition-all mr-1" aria-label="Editar servicio"><i class="fas fa-pen text-xs"></i></button>
                <button type="button" onclick="deleteService(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all" aria-label="Eliminar servicio"><i class="fas fa-trash text-xs"></i></button>
            </td>
        </tr>
        `;
    }).join('');

    const stat = document.getElementById('adminStatServices');
    if (stat) stat.textContent = services.length;
}

async function renderAdminTestimonials() {
    const testimonials = await AppDB.getAllFromStore('testimonials');
    const tbody = document.getElementById('adminTestimonialsTable');
    if (!tbody) return;

    tbody.innerHTML = testimonials.map((item, i) => {
        const id = SiteUtils.normalizeId(item.id) || 0;
        return `
        <tr>
            <td class="text-white/30">${i + 1}</td>
            <td><img src="${SiteUtils.escapeHTML(SiteUtils.safeUrl(item.photo))}" class="w-10 h-10 rounded-full object-cover" alt=""></td>
            <td class="font-display font-bold text-white">${SiteUtils.escapeHTML(item.name)}</td>
            <td class="text-xs">${SiteUtils.escapeHTML(item.role)}</td>
            <td class="text-xs max-w-xs truncate">${SiteUtils.escapeHTML(item.text)}</td>
            <td class="text-right">
                <button type="button" onclick="editTestimonial(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-brand-cyan/20 text-white/60 hover:text-brand-cyan transition-all mr-1" aria-label="Editar testimonio"><i class="fas fa-pen text-xs"></i></button>
                <button type="button" onclick="deleteTestimonial(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all" aria-label="Eliminar testimonio"><i class="fas fa-trash text-xs"></i></button>
            </td>
        </tr>
        `;
    }).join('');

    const stat = document.getElementById('adminStatTestimonials');
    if (stat) stat.textContent = testimonials.length;
}

async function renderAdminMessages() {
    const messages = await AppDB.getAllFromStore('messages');
    const tbody = document.getElementById('adminMessagesTable');
    if (!tbody) return;

    tbody.innerHTML = messages.length === 0
        ? '<tr><td colspan="6" class="text-center text-white/30 py-8">No hay mensajes aún</td></tr>'
        : messages.map((item, i) => {
            const id = SiteUtils.normalizeId(item.id) || 0;
            return `
            <tr>
                <td class="text-white/30">${i + 1}</td>
                <td class="text-xs">${SiteUtils.escapeHTML(SiteUtils.formatDate(item.date))}</td>
                <td class="font-display font-bold text-white">${SiteUtils.escapeHTML(item.name)}</td>
                <td class="text-xs">${SiteUtils.escapeHTML(item.email)}</td>
                <td class="text-xs max-w-xs truncate">${SiteUtils.escapeHTML(item.message)}</td>
                <td class="text-right">
                    <button type="button" onclick="deleteMessage(${id})" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-all" aria-label="Eliminar mensaje"><i class="fas fa-trash text-xs"></i></button>
                </td>
            </tr>
            `;
        }).join('');

    const stat = document.getElementById('adminStatMessages');
    if (stat) stat.textContent = messages.length;
}

async function updateDbPreview() {
    const preview = document.getElementById('dbJsonPreview');
    if (!preview) return;

    const allData = {
        projects: await AppDB.getAllFromStore('projects'),
        services: await AppDB.getAllFromStore('services'),
        testimonials: await AppDB.getAllFromStore('testimonials'),
        messages: await AppDB.getAllFromStore('messages')
    };
    preview.textContent = JSON.stringify(allData, null, 2);
}

// ============================================================
// PROJECT CRUD
// ============================================================

function openProjectForm() {
    document.getElementById('projectFormContainer')?.classList.remove('hidden');
    document.getElementById('formTitle').textContent = 'Nuevo Proyecto';
    document.getElementById('projectForm')?.reset();
    document.getElementById('projectIndex').value = '';
}

function closeProjectForm() {
    document.getElementById('projectFormContainer')?.classList.add('hidden');
}

async function editProject(id) {
    const projects = await AppDB.getAllFromStore('projects');
    const p = projects.find(x => x.id === id);
    if (!p) return;

    document.getElementById('projectFormContainer')?.classList.remove('hidden');
    document.getElementById('formTitle').textContent = 'Editar Proyecto';
    document.getElementById('projectIndex').value = p.id;
    document.getElementById('pTitle').value = p.title;
    document.getElementById('pTag').value = p.tag;
    document.getElementById('pImage').value = p.image;
    document.getElementById('pDescShort').value = p.desc;
    document.getElementById('pDescLong').value = p.descLong || p.desc;
    document.getElementById('pTags').value = p.tags.join(', ');
}

async function deleteProject(id) {
    if (!confirm('¿Eliminar este proyecto permanentemente de Supabase?')) return;
    try {
        await AppDB.deleteFromStore('projects', id);
        await refreshAllSections();
        notify('Proyecto eliminado de Supabase');
    } catch (error) {
        adminError(error, 'No se pudo eliminar el proyecto');
    }
}

// ============================================================
// SERVICE CRUD
// ============================================================

function openServiceForm() {
    document.getElementById('serviceFormContainer')?.classList.remove('hidden');
    document.getElementById('serviceFormTitle').textContent = 'Nuevo Servicio';
    document.getElementById('serviceForm')?.reset();
    document.getElementById('serviceIndex').value = '';
}

function closeServiceForm() {
    document.getElementById('serviceFormContainer')?.classList.add('hidden');
}

async function editService(id) {
    const services = await AppDB.getAllFromStore('services');
    const s = services.find(x => x.id === id);
    if (!s) return;

    document.getElementById('serviceFormContainer')?.classList.remove('hidden');
    document.getElementById('serviceFormTitle').textContent = 'Editar Servicio';
    document.getElementById('serviceIndex').value = s.id;
    document.getElementById('sTitle').value = s.title;
    document.getElementById('sIcon').value = s.icon;
    document.getElementById('sDesc').value = s.desc;
    document.getElementById('sTags').value = s.tags.join(', ');
    document.getElementById('sColor').value = s.color;
}

async function deleteService(id) {
    if (!confirm('¿Eliminar este servicio permanentemente de Supabase?')) return;
    try {
        await AppDB.deleteFromStore('services', id);
        await refreshAllSections();
        notify('Servicio eliminado de Supabase');
    } catch (error) {
        adminError(error, 'No se pudo eliminar el servicio');
    }
}

// ============================================================
// TESTIMONIAL CRUD
// ============================================================

function openTestimonialForm() {
    document.getElementById('testimonialFormContainer')?.classList.remove('hidden');
    document.getElementById('testimonialFormTitle').textContent = 'Nuevo Testimonio';
    document.getElementById('testimonialForm')?.reset();
    document.getElementById('testimonialIndex').value = '';
}

function closeTestimonialForm() {
    document.getElementById('testimonialFormContainer')?.classList.add('hidden');
}

async function editTestimonial(id) {
    const testimonials = await AppDB.getAllFromStore('testimonials');
    const t = testimonials.find(x => x.id === id);
    if (!t) return;

    document.getElementById('testimonialFormContainer')?.classList.remove('hidden');
    document.getElementById('testimonialFormTitle').textContent = 'Editar Testimonio';
    document.getElementById('testimonialIndex').value = t.id;
    document.getElementById('tName').value = t.name;
    document.getElementById('tRole').value = t.role;
    document.getElementById('tPhoto').value = t.photo;
    document.getElementById('tText').value = t.text;
}

async function deleteTestimonial(id) {
    if (!confirm('¿Eliminar este testimonio permanentemente de Supabase?')) return;
    try {
        await AppDB.deleteFromStore('testimonials', id);
        await refreshAllSections();
        notify('Testimonio eliminado de Supabase');
    } catch (error) {
        adminError(error, 'No se pudo eliminar el testimonio');
    }
}

// ============================================================
// MESSAGES
// ============================================================

async function deleteMessage(id) {
    if (!confirm('¿Eliminar este mensaje?')) return;
    try {
        await AppDB.deleteFromStore('messages', id);
        await renderAdminMessages();
        await updateDbPreview();
        notify('Mensaje eliminado');
    } catch (error) {
        adminError(error, 'No se pudo eliminar el mensaje');
    }
}

async function clearAllMessages() {
    if (!confirm('¿Vaciar toda la bandeja de mensajes?')) return;
    try {
        await AppDB.clearStore('messages');
        await renderAdminMessages();
        await updateDbPreview();
        notify('Bandeja vaciada');
    } catch (error) {
        adminError(error, 'No se pudo vaciar la bandeja');
    }
}

// ============================================================
// DATABASE IMPORT / EXPORT / RESET
// ============================================================

async function exportDatabase() {
    try {
        const data = {
            projects: await AppDB.getAllFromStore('projects'),
            services: await AppDB.getAllFromStore('services'),
            testimonials: await AppDB.getAllFromStore('testimonials'),
            messages: await AppDB.getAllFromStore('messages'),
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lordantunez-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        notify('Base de datos exportada correctamente');
    } catch (error) {
        adminError(error, 'No se pudo exportar la base de datos');
    }
}

async function importDatabase(input) {
    const file = input.files[0];
    if (!file) return;

    try {
        const text = await file.text();
        const data = JSON.parse(text);
        const storeNames = ['projects', 'services', 'testimonials', 'messages'];
        const hasImportableData = storeNames.some(storeName => Array.isArray(data[storeName]));
        if (!hasImportableData) throw new Error('El archivo no contiene tablas válidas');

        for (const storeName of storeNames) {
            if (!Array.isArray(data[storeName])) continue;
            await AppDB.clearStore(storeName);
            for (const item of data[storeName]) {
                const cleanItem = { ...item };
                delete cleanItem.id;
                await AppDB.addToStore(storeName, cleanItem);
            }
        }

        await refreshAllSections();
        notify('Base de datos importada correctamente');
    } catch (error) {
        alert(`Error al importar: ${error.message || 'archivo JSON inválido'}`);
    } finally {
        input.value = '';
    }
}

async function resetDatabase() {
    if (!confirm('¿Restaurar TODA la base de datos a los valores de fábrica? Se perderán todos los cambios personalizados.')) return;

    try {
        const seed = AppDB.defaultData();
        for (const storeName of ['projects', 'services', 'testimonials', 'messages']) {
            await AppDB.clearStore(storeName);
            for (const item of seed[storeName]) {
                await AppDB.addToStore(storeName, item);
            }
        }

        await refreshAllSections();
        notify('Base de datos restaurada a valores de fábrica');
    } catch (error) {
        adminError(error, 'No se pudo restaurar la base de datos');
    }
}

// ============================================================
// ADMIN UI
// ============================================================

function switchDbTab(tab) {
    document.querySelectorAll('.admin-nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.db-panel').forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(`dbPanel-${tab}`)?.classList.add('active');
    if (tab === 'settings') updateDbPreview();
}

async function openAdminLogin() {
    try {
        await AppDB.initDB();
        const session = await AppDB.getAdminSession();
        if (session) {
            await openAdminPanel();
            return;
        }
    } catch (error) {
        console.warn(error);
    }

    document.getElementById('adminLoginOverlay')?.classList.add('active');
    document.body.classList.add('modal-open');
    document.getElementById('adminUser')?.focus();
}

function closeAdminLogin() {
    document.getElementById('adminLoginOverlay')?.classList.remove('active');
    document.body.classList.remove('modal-open');
    document.getElementById('loginError')?.classList.add('hidden');
}

async function openAdminPanel() {
    const session = await AppDB.getAdminSession();
    if (!session) {
        await openAdminLogin();
        return;
    }

    document.getElementById('adminPanelOverlay')?.classList.add('active');
    document.body.classList.add('modal-open');
    await refreshAdminSections();
}

function closeAdminPanel() {
    document.getElementById('adminPanelOverlay')?.classList.remove('active');
    document.body.classList.remove('modal-open');
}

async function logoutAdmin() {
    try {
        sessionStorage.removeItem(SESSION_KEY);
        await AppDB.signOutAdmin();
        closeAdminPanel();
        notify('Sesión cerrada');
    } catch (error) {
        adminError(error, 'No se pudo cerrar la sesión');
    }
}

function bindAdminForms() {
    const loginForm = document.getElementById('adminLoginForm');
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loginError = document.getElementById('loginError');
        const submit = loginForm.querySelector('button[type="submit"]');
        const email = document.getElementById('adminUser')?.value.trim();
        const password = document.getElementById('adminPass')?.value;

        try {
            loginError?.classList.add('hidden');
            if (submit) submit.disabled = true;
            await AppDB.signInAdmin(email, password);
            sessionStorage.setItem(SESSION_KEY, 'true');
            closeAdminLogin();
            await openAdminPanel();
            notify('Bienvenido al panel de administración');
        } catch (error) {
            console.error(error);
            loginError?.classList.remove('hidden');
            notify(error?.message || 'No se pudo iniciar sesión');
        } finally {
            if (submit) submit.disabled = false;
        }
    });

    document.getElementById('projectForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('projectIndex').value;
        const data = {
            title: document.getElementById('pTitle').value,
            tag: document.getElementById('pTag').value,
            image: document.getElementById('pImage').value,
            desc: document.getElementById('pDescShort').value,
            descLong: document.getElementById('pDescLong').value,
            tags: document.getElementById('pTags').value.split(',').map(t => t.trim()).filter(Boolean)
        };

        try {
            if (id) {
                data.id = parseInt(id, 10);
                await AppDB.updateInStore('projects', data);
                notify('Proyecto actualizado en Supabase');
            } else {
                await AppDB.addToStore('projects', data);
                notify('Proyecto agregado a Supabase');
            }
            closeProjectForm();
            await refreshAllSections();
        } catch (error) {
            adminError(error, 'No se pudo guardar el proyecto');
        }
    });

    document.getElementById('serviceForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('serviceIndex').value;
        const data = {
            title: document.getElementById('sTitle').value,
            icon: document.getElementById('sIcon').value,
            desc: document.getElementById('sDesc').value,
            tags: document.getElementById('sTags').value.split(',').map(t => t.trim()).filter(Boolean),
            color: document.getElementById('sColor').value
        };

        try {
            if (id) {
                data.id = parseInt(id, 10);
                await AppDB.updateInStore('services', data);
                notify('Servicio actualizado en Supabase');
            } else {
                await AppDB.addToStore('services', data);
                notify('Servicio agregado a Supabase');
            }
            closeServiceForm();
            await refreshAllSections();
        } catch (error) {
            adminError(error, 'No se pudo guardar el servicio');
        }
    });

    document.getElementById('testimonialForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('testimonialIndex').value;
        const data = {
            name: document.getElementById('tName').value,
            role: document.getElementById('tRole').value,
            photo: document.getElementById('tPhoto').value,
            text: document.getElementById('tText').value
        };

        try {
            if (id) {
                data.id = parseInt(id, 10);
                await AppDB.updateInStore('testimonials', data);
                notify('Testimonio actualizado en Supabase');
            } else {
                await AppDB.addToStore('testimonials', data);
                notify('Testimonio agregado a Supabase');
            }
            closeTestimonialForm();
            await refreshAllSections();
        } catch (error) {
            adminError(error, 'No se pudo guardar el testimonio');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindAdminForms();
    updateDatabaseStatus();
});

window.AdminRender = {
    renderAdminProjects,
    renderAdminServices,
    renderAdminTestimonials,
    renderAdminMessages,
    updateDbPreview,
    updateDatabaseStatus,
    refreshAdminSections
};

Object.assign(window, {
    openProjectForm,
    closeProjectForm,
    editProject,
    deleteProject,
    openServiceForm,
    closeServiceForm,
    editService,
    deleteService,
    openTestimonialForm,
    closeTestimonialForm,
    editTestimonial,
    deleteTestimonial,
    deleteMessage,
    clearAllMessages,
    exportDatabase,
    importDatabase,
    resetDatabase,
    switchDbTab,
    openAdminLogin,
    closeAdminLogin,
    openAdminPanel,
    closeAdminPanel,
    logoutAdmin
});
