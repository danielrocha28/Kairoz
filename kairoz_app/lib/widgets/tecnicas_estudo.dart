import 'package:flutter/material.dart';
import 'package:kairoz/constants/tecnicas_estudo_const.dart';

class TecnicaEstudoModel {
  late String titulo;
  late String descricao;
  late List<String> dicas;

  TecnicaEstudoModel({
    required this.titulo,
    required this.descricao,
    required this.dicas,
  });
}

class TecnicasEstudo extends StatelessWidget {
  const TecnicasEstudo({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Técnicas de Estudo',
          textAlign: TextAlign.start,
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Column(
          children: tecnicasDeEstudo.map((tecnica) {
            return Card(
              margin: const EdgeInsets.only(bottom: 12),
              color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 8),
                child: ListTile(
                  title: Text(
                    tecnica.titulo,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 82, 22, 185),
                    ),
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 10),
                      Text(tecnica.descricao),
                      const SizedBox(height: 10),
                      const Text(
                        'Dicas:',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      const SizedBox(height: 4),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: tecnica.dicas.map((item) {
                          return Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text('• '), // Marcador
                              Expanded(child: Text(item)),
                            ],
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
