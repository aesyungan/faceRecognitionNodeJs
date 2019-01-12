# faceRecognitionNodeJs
instalacion en centOS 7.5 
```
yum install libX11-devel
```
```
yum install libopenblas-dev
```
```
yum install libpng-devel
```
```
yum install openblas-devel
```

```
yum install opencv-devel
```
### instal cmake
```
wget --no-check-certificate https://cmake.org/files/v3.13/cmake-3.13.0-rc1.tar.gz
tar -zxvf cmake-3.13.0-rc1.tar.gz
cd cmake-3.13.0
# need to build against system curl to get https support
# -> install devel packages
yum -y install curl-devel zlib-devel
./bootstrap --system-curl
make && make install
```
### otros
```
npm install -g node-gyp
```
### others libs for preformance
https://www.vultr.com/docs/how-to-install-ffmpeg-on-centos
### python3
```
# sudo yum install -y https://centos7.iuscommunity.org/ius-release.rpm
```
```
# sudo yum install -y python36u python36u-libs python36u-devel python36u-pip
```
```
# sudo yum groupinstall -y "Development Tools"
```

### open blass
```
  # yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
```
```
  # yum search openblas
```
```
  # yum install openblas-devel
```
