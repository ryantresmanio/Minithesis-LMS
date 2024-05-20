import Swal from 'sweetalert2';

export const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure you want to log out?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem('userRole');
      window.location.href = "/";
    }
  });
};