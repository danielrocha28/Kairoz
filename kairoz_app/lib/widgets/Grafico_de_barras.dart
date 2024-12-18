import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class GraficoDeBarras extends StatelessWidget {
  const GraficoDeBarras({super.key});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceEvenly,
        maxY: 24,
        barGroups: _getBarGroups(),
        borderData: FlBorderData(show: false),
        gridData: const FlGridData(show: false),
        titlesData: FlTitlesData(
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              reservedSize: 40,
              getTitlesWidget: (value, meta) {
                if (value % 1 == 0 && value >= 1 && value <= 24) {
                  return Text(
                    '${value.toInt()}h',
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  );
                }
                return Container();
              },
            ),
          ),
          topTitles: const AxisTitles(
            sideTitles: SideTitles(showTitles: false),
          ),
          rightTitles: const AxisTitles(
            sideTitles: SideTitles(showTitles: false),
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
                    return const Text('Dom', style: style);
                  case 1:
                    return const Text('Seg', style: style);
                  case 2:
                    return const Text('Ter', style: style);
                  case 3:
                    return const Text('Qua', style: style);
                  case 4:
                    return const Text('Qui', style: style);
                  case 5:
                    return const Text('Sex', style: style);
                  case 6:
                    return const Text('Sáb', style: style);
                  default:
                    return const Text('');
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
