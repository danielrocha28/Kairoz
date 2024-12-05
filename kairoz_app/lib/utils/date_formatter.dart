import 'package:intl/intl.dart';

class DateFormatter {
  static String formatDate(DateTime date) {
    return DateFormat('dd/MM/yyyy', 'pt_BR').format(date);
  }

  static String getDaysRemainingText(int days) {
    if (days == 0) {
      return 'Vence hoje';
    } else if (days < 0) {
      return 'Venceu há ${-days} ${-days == 1 ? 'dia' : 'dias'}';
    } else {
      return 'Faltam $days ${days == 1 ? 'dia' : 'dias'}';
    }
  }
}
