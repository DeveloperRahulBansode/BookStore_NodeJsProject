$(document).ready(function () {
    $('#resetForm').submit(function (e) {
      e.preventDefault();
  
      const newPassword = $('#newPassword').val();
      const confirmPassword = $('#confirmPassword').val();
      const messageDiv = $('#message');
      
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token'); 
  
      if (!token) {
        messageDiv.text("Token is missing or invalid.").css("color", "red");
        return;
      }
  
      if (newPassword !== confirmPassword) {
        messageDiv.text("Passwords do not match.").css("color", "red");
        return;
      }
  
      // Send the request with the token and new password
      $.ajax({
        // url: 'http://localhost:3000/api/v1/users/reset', 
        url:'http://localhost:3000/api/v1/admin/reset',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ token, password: newPassword, confirmPassword: confirmPassword }),
        success: function (res) {
          messageDiv.text(res.message).css("color", res.success ? "green" : "red");
        },
        error: function () {
          messageDiv.text("Something went wrong.").css("color", "red");
        }
      });
    });
  });
  