class PasswordService {
  PasswordService();

  String? validatePassword(String newPassword, String confirmPassword) {
    if (newPassword.length < 6) {
      return 'A nova senha deve ter pelo menos 6 caracteres.';
    }

    if (newPassword != confirmPassword) {
      return 'As senhas não coincidem.';
    }

    return null;
  }

  Future<bool> changePassword(String oldPassword, String newPassword) async {
    await Future.delayed(const Duration(seconds: 2));

    if (oldPassword == newPassword) {
      return false;
    }

    return true;
  }
}
