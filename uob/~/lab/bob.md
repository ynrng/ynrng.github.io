```sh
cd /dev/
sudo chmod 777 tty*
cd ~/g5

# navigation
miracenter -c /opt/MIRA-commercial/domains/robot/SCITOSConfigs/etc/SCITOS-Pilot.xml --variables staticMap=~/g5/lab-static.xml

# mapping & search for SimpleMapper
miracenter -c /opt/MIRA-commercial/domains/robot/SCITOSConfigs/etc/SCITOS-mapping.xml

```