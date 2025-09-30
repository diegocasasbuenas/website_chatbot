interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface ViewportMetrics {
  width: number;
  height: number;
  safeArea: SafeAreaInsets;
}

const parsePxValue = (value: string): number => {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getSafeAreaInsets = (): SafeAreaInsets => {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }

  const computed = getComputedStyle(document.documentElement);

  return {
    top: parsePxValue(computed.getPropertyValue('--safe-area-inset-top')),
    bottom: parsePxValue(computed.getPropertyValue('--safe-area-inset-bottom')),
    left: parsePxValue(computed.getPropertyValue('--safe-area-inset-left')),
    right: parsePxValue(computed.getPropertyValue('--safe-area-inset-right')),
  };
};

export const getViewportMetrics = (): ViewportMetrics => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      safeArea: { top: 0, bottom: 0, left: 0, right: 0 },
    };
  }

  const safeArea = getSafeAreaInsets();
  const visualViewport = window.visualViewport;

  const widthCandidates = [
    visualViewport?.width ?? 0,
    window.innerWidth ?? 0,
    document.documentElement?.clientWidth ?? 0,
    document.body?.clientWidth ?? 0,
  ];

  const heightCandidates = [
    visualViewport?.height ?? 0,
    window.innerHeight ?? 0,
    document.documentElement?.clientHeight ?? 0,
    document.body?.clientHeight ?? 0,
  ];

  const width = Math.max(...widthCandidates);
  const height = Math.max(...heightCandidates);

  return {
    width,
    height,
    safeArea,
  };
};
