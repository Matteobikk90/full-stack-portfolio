export const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/Matteo_Soresini_CV_2025.pdf';
  link.download = 'Matteo_Soresini_CV_2025.pdf';
  link.click();
};
