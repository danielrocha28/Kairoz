import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class PieChartContainer extends StatelessWidget {
  const PieChartContainer({super.key});

  menuButton(String value) {
    switch (value) {
      case 'Adicionar à Tela Inicial':
        print('Adicionar À Tela Inicial');
        break;
      case 'Salvar':
        print('Salvar');
        break;
      case 'Deletar':
        print('Deletar');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 400,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey, width: 1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Stack(
        children: [
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: PieChartSample(),
          ),
          Positioned(
            top: 16,
            right: 16,
            child: PopupMenuButton<String>(
              onSelected: (value) => menuButton(value),
              itemBuilder: (BuildContext context) {
                return [
                  const PopupMenuItem<String>(
                    value: 'Adicionar à Tela Inicial',
                    child: Text('Adicionar à Tela Inicial'),
                  ),
                  const PopupMenuItem<String>(
                    value: 'Salvar',
                    child: Text('Salvar'),
                  ),
                  const PopupMenuItem<String>(
                    value: 'Deletar',
                    child: Text('Deletar'),
                  ),
                ];
              },
              icon: const Icon(Icons.menu),
            ),
          ),
        ],
      ),
    );
  }
}

class PieChartSample extends StatelessWidget {
  const PieChartSample({super.key});

  @override
  Widget build(BuildContext context) {
    return PieChart(
      PieChartData(
        sections: [
          PieChartSectionData(
            color: Colors.red,
            value: 30,
            title: '30%',
            radius: 180,
          ),
          PieChartSectionData(
            color: Colors.blue,
            value: 50,
            title: '50%',
            radius: 180,
          ),
          PieChartSectionData(
            color: Colors.green,
            value: 15,
            title: '15%',
            radius: 180,
          ),
          PieChartSectionData(
            color: Colors.orange,
            value: 5,
            title: '5%',
            radius: 180,
          ),
        ],
        borderData: FlBorderData(
          show: false,
        ),
        centerSpaceRadius: 0,
        sectionsSpace: 0,
      ),
    );
  }
}
