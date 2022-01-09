export default function isEnvironmentProduction() {
  return import.meta.env.MODE === 'production';
}
