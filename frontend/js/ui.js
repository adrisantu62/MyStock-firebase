// TODO: refactorizar todos los innerHTML por appendChild

export function clearContainer(element) {
  if (!element) return;
  element.innerHTML = '';
}

export function showLoader(visible = true) {
  const id = 'global-loader';
  const loaderElement = document.querySelector(`#${id}`);
  if (!loaderElement) {
    loaderElement = document.createElement('div');
    loaderElement.id = id;

    const backdrop = document.createElement('div');
    backdrop.className = 'loader-backdrop';

    const spinner = document.createElement('div');
    spinner.className = 'loader-spinner';

    loaderElement.appendChild(backdrop);
    loaderElement.appendChild(spinner);

    document.body.appendChild(loaderElement);
  }

  loaderElement.style.display = visible ? 'flex' : 'none';
}

export function showError(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="ui-error">
      ${message}
    </div>
  `;
}

export function showSuccess(container, message) {
  if (!container) return;

  container.innerHTML = `
    <div class="ui-success">
      ${message}
    </div>
  `;
}

export function confirmAction(message) {
  return window.confirm(message);
}

export function setButtonLoading(button, loading = true) {
  if (!button) return;

  button.disabled = loading;
  button.classList.toggle('loading', loading);
}
