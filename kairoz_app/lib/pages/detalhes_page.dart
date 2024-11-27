import 'package:flutter/material.dart';
import 'package:kairoz/widgets/appbar.dart';

class DetalhesPage extends StatelessWidget {
  final String titulo;
  final String detalhesId;

  const DetalhesPage({
    super.key,
    required this.titulo,
    required this.detalhesId,
  });

  @override
  Widget build(BuildContext context) {
    final Map<String, String> detalhes = {
      'pomodoro': '''
O Método Pomodoro é uma técnica de gerenciamento de tempo. 
Ela consiste em dividir o trabalho em blocos de tempo de 25 minutos, chamados "pomodoros", separados por breves pausas. 
Após quatro pomodoros, faça uma pausa mais longa (15-30 minutos). 
Essa técnica ajuda na concentração e produtividade.
''',
      'feynman': '''
A Técnica de Feynman é uma maneira eficaz de aprender qualquer coisa. 
Você estuda um conceito e tenta explicá-lo com suas próprias palavras como se estivesse ensinando para alguém. 
Se perceber que não consegue explicar algum ponto, identifique e revise até dominar completamente o tópico.
''',
      'pareto': '''
A Técnica de Pareto baseia-se no Princípio 80/20: 
80% dos resultados vêm de 20% dos esforços. 
Para aplicá-la, identifique as tarefas mais importantes que geram maior impacto nos seus estudos e foque nelas. 
Elimine ou minimize o tempo gasto com atividades menos produtivas.
''',
      'intercalado': '''
O Estudo Intercalado consiste em alternar entre tópicos ou habilidades diferentes em vez de focar em um único assunto por vez. 
Essa técnica melhora a retenção de informações e reforça conexões entre conceitos, ajudando a entender o conteúdo de forma mais ampla.
''',
    };

    final Map<String, String> imagens = {
      'pomodoro': 'assets/estudos.png',
      'feynman': 'assets/feynman.png',
      'pareto': 'assets/pareto.jpg',
      'intercalado': 'assets/intercalado.jpg',
    };

    final descricaoDetalhada =
        detalhes[detalhesId] ?? 'Informação não disponível';
    final imagemDetalhada = imagens[detalhesId] ?? 'assets/estudos.png';

    return Scaffold(
      appBar: MyAppBar(
        title: titulo,
        titleFontSize: 22.0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 200,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(imagemDetalhada),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              const SizedBox(height: 20),
              Card(
                elevation: 4,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    descricaoDetalhada,
                    style: const TextStyle(fontSize: 16, height: 1.5),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
