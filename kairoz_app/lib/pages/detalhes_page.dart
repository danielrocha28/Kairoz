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
      'saude': '''

Cuidar do corpo e da mente é essencial para uma vida equilibrada. A prática regular de exercícios físicos traz inúmeros benefícios, como a melhora da disposição, o fortalecimento dos músculos e a redução do estresse. Além disso, ao reservar um tempo para se movimentar, você está investindo na sua saúde e bem-estar.
Uma caminhada ao ar livre, por exemplo, permite apreciar a natureza enquanto você exercita o corpo. Já atividades como alongamentos ou yoga ajudam a melhorar a flexibilidade e promovem relaxamento. Lembre-se de que o importante não é a intensidade, mas sim a constância.
Comece aos poucos, estabeleça metas realistas e celebre cada pequena conquista. Seu corpo é seu templo, e cada movimento é um passo em direção a uma versão mais saudável e feliz de você mesmo.
Agora, respire fundo, levante-se e movimente-se. O primeiro passo é sempre o mais importante!
''',
      'foco': '''
Focar nos estudos é crucial para atingir seus objetivos acadêmicos e profissionais. Organizar sua rotina de maneira eficiente pode melhorar seu desempenho, ajudar a otimizar o uso do tempo e evitar a procrastinação. Métodos como o Pomodoro, que alterna entre períodos de estudo e pausas curtas, são excelentes para aumentar a concentração e manter o foco ao longo do tempo. Além disso, a revisão espaçada, que consiste em revisar o conteúdo em intervalos regulares, é uma técnica comprovada para fortalecer a memória de longo prazo.
Criar um ambiente de estudo livre de distrações, como escolher um local tranquilo e organizar suas ferramentas de estudo, é essencial para garantir que você esteja 100% focado. Ajustar seu planejamento conforme necessário também permite que você lide melhor com imprevistos, tornando seu processo de aprendizado mais flexível e eficaz.
Com a abordagem certa, é possível transformar a rotina de estudos em uma prática mais produtiva, eficiente e focada, garantindo o alcance dos seus objetivos com mais facilidade e consistência.''',
      'Pausa!': '''
No mundo acelerado de hoje, estamos constantemente ocupados com tarefas, compromissos e prazos. É fácil acreditar que as pausas são uma perda de tempo, mas, na realidade, elas são fundamentais para o nosso bem-estar e produtividade. Pausas não são apenas intervalos para descansar, mas oportunidades valiosas para aprendizado e reflexão. Ao transformar esses momentos em algo mais significativo, podemos melhorar nossa eficiência e promover um equilíbrio mental saudável.
''',
      'Bem-estar': '''
No mundo acelerado de hoje, estamos constantemente ocupados com tarefas, compromissos e prazos. É fácil acreditar que as pausas são uma perda de tempo, mas, na realidade, elas são fundamentais para o nosso bem-estar e produtividade. Pausas não são apenas intervalos para descansar, mas oportunidades valiosas para aprendizado e reflexão. Ao transformar esses momentos em algo mais significativo, podemos melhorar nossa eficiência e promover um equilíbrio mental saudável.
''',
    };

    final Map<String, String> imagens = {
      'pomodoro': 'assets/estudos.png',
      'feynman': 'assets/feynman.png',
      'pareto': 'assets/pareto.jpg',
      'intercalado': 'assets/intercalado.jpg',
      'foco': 'assets/fundo1.jpg',
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
