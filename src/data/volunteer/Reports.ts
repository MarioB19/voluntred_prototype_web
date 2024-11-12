export const reportsData = {
    impactStatistics: {
      horasVoluntariado: 120,
      eventosAsistidos: 15,
      odsImpactados: 5,
    },
    barChartData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Horas de Voluntariado',
          data: [30, 45, 60, 35, 50, 70, 40, 55, 65, 75, 80, 90],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    },
    pieChartData: {
      labels: ['ODS 1', 'ODS 2', 'ODS 3', 'ODS 4', 'ODS 5'],
      datasets: [
        {
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    },
    certificados: [
      { id: 1, title: "Limpieza de Playa", date: "15/05/2024" },
      { id: 2, title: "Reforestación Urbana", date: "22/06/2024" },
      { id: 3, title: "Taller de Reciclaje", date: "10/07/2024" },
    ],
    insignias: [
      { id: 1, title: "Eco Guerrero", description: "100 horas de voluntariado ambiental" },
      { id: 2, title: "Líder Comunitario", description: "Apoyo en la organización de un evento" },
      { id: 3, title: "Innovador Social", description: "Propuesta de proyecto implementada" },
    ],
    metasPersonales: [
      { id: 1, title: "200 horas de voluntariado", progress: 60 },
      { id: 2, title: "Impactar 5 ODS", progress: 80 },
      { id: 3, title: "Realizar 50 publicaciones", progress: 30 },
    ],
    years: [2024, 2023, 2022],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }