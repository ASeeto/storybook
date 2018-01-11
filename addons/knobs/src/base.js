import KnobManager from './KnobManager';

export const manager = new KnobManager();

export function knob(name, options) {
  return manager.knob(name, options);
}

export function text(name, data = {}) {
  return manager.knob(name, { ...data, type: 'text' });
}

export function boolean(name, data = {}) {
  return manager.knob(name, { ...data, type: 'boolean' });
}

export function number(name, data = {}) {
  const rangeDefaults = {
    min: 0,
    max: 10,
    step: 1,
  };

  const mergedData = data.range
    ? {
        ...rangeDefaults,
        ...data,
      }
    : data;

  return manager.knob(name, { ...mergedData, type: 'number' });
}

export function color(name, data = {}) {
  return manager.knob(name, { ...data, type: 'color' });
}

export function object(name, data = {}) {
  return manager.knob(name, { ...data, type: 'object' });
}

// @todo data.options
export function select(name, data = {}) {
  return manager.knob(name, { ...data, type: 'select' });
}

export function array(name, data = { separator: ',' }) {
  return manager.knob(name, { ...data, type: 'array' });
}

export function date(name, data = { value: new Date() }) {
  const proxyValue =
    data.value && typeof data.value.getTime === 'function' ? data.value.getTime() : null;
  return manager.knob(name, { ...data, type: 'date', value: proxyValue });
}

export function button(name, data = {}) {
  return manager.knob(name, { ...data, type: 'button', hideLabel: true });
}
