export const updateSliceProperty =
  <T>(sliceKey: keyof T, propertyKey: keyof T[keyof T], value: unknown) =>
  (set: (fn: (state: T) => T) => void) => {
    set((state: T) => {
      if (state[sliceKey][propertyKey] === value) {
        return state;
      }
      return {
        ...state,
        [sliceKey]: {
          ...state[sliceKey],
          [propertyKey]: value,
        },
      };
    });
  };

export const updateSliceProperties =
  <T>(sliceKey: keyof T, properties: Partial<T[keyof T]>) =>
  (set: (fn: (state: T) => T) => void) => {
    set((state: T) => {
      const currentSlice = state[sliceKey];
      const shouldUpdate = Object.entries(properties).some(
        ([key, value]) =>
          JSON.stringify(currentSlice[key as keyof T[keyof T]]) !==
          JSON.stringify(value)
      );

      if (!shouldUpdate) {
        return state;
      }

      return {
        ...state,
        [sliceKey]: {
          ...currentSlice,
          ...properties,
        },
      };
    });
  };
