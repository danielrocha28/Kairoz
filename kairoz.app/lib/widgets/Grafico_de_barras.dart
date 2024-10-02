import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Horas Estudadas - Dias da Semana')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: BarChartWidget(),
        ),
      ),
    );
  }
}

class BarChartWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceEvenly,
        maxY: 24, // Define a escala máxima do eixo Y
        barGroups: _getBarGroups(),
        borderData: FlBorderData(show: false),
        gridData: FlGridData(show: false), // Remover linhas de fundo
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 40, // Espaço reservado para os títulos
              getTitlesWidget: (value, meta) {
                // Formatar números como horas
                if (value % 1 == 0 && value >= 1 && value <= 24) {
                  return Text(
                    '${value.toInt()}h', // Exibe as horas
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  );
                }
                return Container(); // Retorna um container vazio para valores não exibidos
              },
            ),
          ),
          topTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false), // Remover títulos no topo
          ),
          rightTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: false), // Remover títulos à direita
          ),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (double value, TitleMeta meta) {
                const style = TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                );
                switch (value.toInt()) {
                  case 0:
                    return Text('Dom', style: style);
                  case 1:
                    return Text('Seg', style: style);
                  case 2:
                    return Text('Ter', style: style);
                  case 3:
                    return Text('Qua', style: style);
                  case 4:
                    return Text('Qui', style: style);
                  case 5:
                    return Text('Sex', style: style);
                  case 6:
                    return Text('Sáb', style: style);
                  default:
                    return Text('');
                }
              },
            ),
          ),
        ),
      ),
    );
  }

  List<BarChartGroupData> _getBarGroups() {
    return [
      BarChartGroupData(x: 0, barRods: [
        BarChartRodData(toY: 5, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 1, barRods: [
        BarChartRodData(toY: 7, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 2, barRods: [
        BarChartRodData(toY: 8, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 3, barRods: [
        BarChartRodData(toY: 6, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 4, barRods: [
        BarChartRodData(toY: 9, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 5, barRods: [
        BarChartRodData(toY: 10, color: Colors.blue, width: 15),
      ]),
      BarChartGroupData(x: 6, barRods: [
        BarChartRodData(toY: 4, color: Colors.blue, width: 15),
      ]),
    ];
  }
}
