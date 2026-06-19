Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)
scriptPath = fso.BuildPath(currentDir, "desktop.pyw")
pythonwPath = "C:\Users\mppat\AppData\Local\Python\pythoncore-3.14-64\pythonw.exe"
WshShell.Run """" & pythonwPath & """ """ & scriptPath & """", 0, False
