export const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/Matteo_Soresini_FullStackDeveloper_CV.pdf';
  link.download = 'Matteo_Soresini_FullStackDeveloper_CV.pdf';
  link.click();
};
