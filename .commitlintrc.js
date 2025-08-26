module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos de commit permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat',      // Nueva funcionalidad
        'fix',       // Corrección de bug
        'docs',      // Documentación
        'style',     // Cambios de estilo (formato, espacios, etc.)
        'refactor',  // Refactorización de código
        'test',      // Agregar o modificar tests
        'chore',     // Tareas de mantenimiento
        'perf',      // Mejoras de performance
        'ci',        // Cambios en CI/CD
        'build',     // Cambios en build system
        'revert',    // Revertir commits anteriores
      ],
    ],
    
    // Formato del scope (opcional)
    'scope-case': [2, 'always', 'kebab-case'],
    
    // Formato del subject
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'subject-empty': [2, 'never'],
    
    // Formato del body
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    
    // Formato del footer
    'footer-leading-blank': [2, 'always'],
    'footer-max-line-length': [2, 'always', 100],
  },
  
  // Mensajes de error personalizados
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  
  // Ejemplos de commits válidos
  examples: {
    valid: [
      'feat: agregar sistema de notificaciones',
      'fix(auth): resolver error de autenticación',
      'docs: actualizar README con nuevas instrucciones',
      'style(ui): ajustar espaciado en componentes',
      'refactor(api): simplificar endpoints de citas',
      'test(components): agregar tests para Gallery',
      'chore(deps): actualizar Next.js a v14',
      'perf(images): optimizar carga de imágenes',
      'ci: configurar GitHub Actions',
      'build: actualizar configuración de webpack',
      'revert: revertir cambios en formulario de contacto',
    ],
    invalid: [
      'update stuff',
      'fixed bug',
      'wip',
      'quick fix',
      'FEAT: nueva funcionalidad',
      'fix:',
      'feat: AGREGAR SISTEMA',
    ],
  },
};
