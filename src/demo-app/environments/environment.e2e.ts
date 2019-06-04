// Specific environment config for running e2e tests
// In e2e test, we want to disable external images shown in app header,
// so that the tests don't need to wait for external resources to load
export const environment: any  = {
  production: false,
  enableExternalImages: false
};
