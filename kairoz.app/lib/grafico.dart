import 'package:flutter/material.dart'; 
import 'package:fl_chart/fl_chart.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: Text('Gráfico de Pizza')),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: PieChartContainer(),
        ),
      ),
    );
  }
}

class PieChartContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 400, // Define a altura do container
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey, width: 1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0), // Espaçamento interno
            child: PieChartSample(), // Gráfico de Pizza
          ),
          Positioned(
            top: 16,
            right: 16,
            child: PopupMenuButton<String>(
              onSelected: (value) {
                // Ação ao selecionar uma opção
                switch (value) {
                  case 'Adicionar à Tela Inicial':
                    print('Adicionar à Tela Inicial');
                    break;
                  case 'Salvar':
                    print('Salvar');
                    break;
                  case 'Deletar':
                    print('Deletar');
                    break;
                }
              },
              itemBuilder: (BuildContext context) {
                return [
                  PopupMenuItem<String>(
                    value: 'Adicionar à Tela Inicial',
                    child: Text('Adicionar à Tela Inicial'),
                  ),
                  PopupMenuItem<String>(
                    value: 'Salvar',
                    child: Text('Salvar'),
                  ),
                  PopupMenuItem<String>(
                    value: 'Deletar',
                    child: Text('Deletar'),
                  ),
                ];
              },
              icon: Icon(Icons.menu), // Ícone do botão de menu
            ),
          ),
        ],
      ),
    );
  }
}

class PieChartSample extends StatelessWidget {
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
          show: false, // Desativa a borda
        ),
        centerSpaceRadius: 0, // Espaço central
        sectionsSpace: 0, // Espaço entre as seções
      ),
    );
  }
}
