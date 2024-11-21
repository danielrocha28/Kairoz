class ValidationService {
  static String? validateField(String value) {
    if (value.isEmpty) {
      return 'O campo não pode ser vazio.';
    }
    if (value.length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres.';
    }
    if (!RegExp(r'^(?=.*[a-zA-Z])[0-9a-zA-Z]+$').hasMatch(value)) {
      return 'O nome não pode possuir apenas números';
    }
    return null;
  }

  static String? emailValidateField(String email) {
    if (email.isEmpty) {
      return 'O e-mail não pode ser vazio.';
    }
    final emailRegex =
        RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
    if (!emailRegex.hasMatch(email)) {
      return 'Digite um e-mail válido.';
    }
    return null;
  }

  static String? validatePhoneNumber(String phoneNumber) {
    final cleanedPhone = phoneNumber.replaceAll(RegExp(r'\D'), '');
    if (cleanedPhone.length != 11) {
      return 'O número de telefone inválido.';
    }
    return null;
  }

  static String? validatePassword(String password, String confirmPassword) {
    if (password.isEmpty || confirmPassword.isEmpty) {
      return 'A senha não pode ser vazia.';
    }
    if (password != confirmPassword) {
      return 'As senhas não coincidem.';
    }
    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    return null;
  }
}
