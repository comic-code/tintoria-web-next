import Swal from "sweetalert2";

export function SuccessAlert(title, description) {
  Swal.fire({
    icon: 'success',
    title,
    text: description,
  })
}

export function ErrorAlert(title, description) {
  Swal.fire({
    icon: 'error',
    title,
    text: description,
  })
}

export function InfoAlert(title, description) {
  Swal.fire({
    icon: 'info',
    title,
    text: description,
  })
}