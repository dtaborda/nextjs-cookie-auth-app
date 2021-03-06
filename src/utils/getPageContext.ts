// import { createGenerateClassName } from '@material-ui/core/styles';
import { theme } from '../../styles/theme';

function createPageContext() {
  return {
    theme,
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  const { browser } = process ? (process as any) : null;
  let { __INIT_MATERIAL_UI__ } = global as any;
  if (!browser) {
    return createPageContext();
  }
  // Reuse context on the client-side.
  if (!__INIT_MATERIAL_UI__) {
    __INIT_MATERIAL_UI__ = createPageContext();
  }
  return __INIT_MATERIAL_UI__;
}
