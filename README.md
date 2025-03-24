# CPU Scheduler Simulator

A modern, interactive CPU scheduling algorithm simulator built with React, TypeScript, and Material-UI. This application provides a visual and intuitive way to understand various CPU scheduling algorithms.

## Features

- **Multiple Scheduling Algorithms**
  - First Come First Served (FCFS)
  - Shortest Job First (SJF)
  - Shortest Remaining Time First (SRTF)
  - Round Robin (RR)
  - Priority Scheduling
  - Banker's Algorithm

- **Interactive Interface**
  - Real-time process management
  - Dynamic Gantt chart visualization
  - Performance metrics calculation
  - Beautiful Material-UI components

- **Performance Metrics**
  - Average Turnaround Time
  - Average Waiting Time
  - Throughput Analysis

## Tech Stack

- React 18
- TypeScript
- Material-UI
- Framer Motion
- Tailwind CSS
- Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abdurrahman-akash/CPU-Scheduling-Simulator
cd cpu-scheduler
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Usage

1. Select a scheduling algorithm from the dropdown menu
2. Add processes with their details:
   - Process ID
   - Arrival Time
   - Burst Time
   - Priority (for Priority Scheduling)

3. Click "Calculate" to see the results:
   - Gantt chart visualization
   - Process completion details
   - Performance metrics

## Project Structure

```
src/
├── components/         # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── lib/              # Utility functions
```

## Key Components

- **ProcessForm**: Add new processes to the simulation
- **ProcessTable**: Display process information in a table format
- **GanttChart**: Visualize process execution timeline
- **BankersForm**: Input for Banker's Algorithm simulation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful component library
- Framer Motion for smooth animations
- The React community for inspiration and support

## Contact

Your Name - [@abdur-rahman-akash](https://www.linkedin.com/in/abdur-rahman-akash/)
