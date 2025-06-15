Comprehensive Bash Command Reference

Navigation and File Management
    # Directory Navigation
    pwd                     # Print working directory
    cd /path/to/directory   # Change directory
    cd ..                   # Go up one directory
    cd ~                    # Go to home directory
    cd -                    # Go to previous directory

    # Listing Files
    ls                      # List files in current directory
    ls -l                   # List with details
    ls -a                   # List all files (including hidden)
    ls -la                  # List all files with details
    ls -lh                  # List with human-readable sizes
    ls -R                   # List recursively

    # File Operations
    touch file.txt          # Create empty file or update timestamp
    mkdir directory         # Create directory
    mkdir -p dir1/dir2      # Create nested directories
    cp file1 file2          # Copy file
    cp -r dir1 dir2         # Copy directory recursively
    mv file1 file2          # Move/rename file
    rm file                 # Remove file
    rm -f file              # Force remove file
    rm -r directory         # Remove directory recursively
    rm -rf directory        # Force remove directory recursively
    ln -s file link         # Create symbolic link

    # File Viewing
    cat file                # Display file contents
    less file               # View file with pagination
    head file               # View first 10 lines
    head -n 20 file         # View first 20 lines
    tail file               # View last 10 lines
    tail -n 20 file         # View last 20 lines
    tail -f file            # Follow file updates in real-time

---

File Manipulation
    # Text Processing
    grep "pattern" file     # Search for pattern in file
    grep -r "pattern" dir   # Search recursively in directory
    grep -i "pattern" file  # Case-insensitive search
    grep -v "pattern" file  # Show lines NOT matching pattern
    grep -n "pattern" file  # Show line numbers

    # Text Editing
    sed 's/old/new/' file   # Replace first occurrence in each line
    sed 's/old/new/g' file  # Replace all occurrences
    sed -i 's/old/new/g' file # Replace and save changes to file
    awk '{print $1}' file   # Print first column
    awk -F, '{print $1}' file # Use comma as delimiter

    # File Comparison
    diff file1 file2        # Compare two files
    cmp file1 file2         # Compare two files byte by byte
    comm file1 file2        # Compare sorted files

    # File Permissions
    chmod +x file           # Make file executable
    chmod 755 file          # Set permissions (rwx for owner, rx for others)
    chmod -R 755 directory  # Set permissions recursively
    chown user:group file   # Change file owner and group

---

System Information
    # System
    uname -a                # Display system information
    hostname                # Display hostname
    whoami                  # Display current user
    id                      # Display user and group IDs
    date                    # Display current date and time
    uptime                  # Show system uptime
    w                       # Show who is logged in and what they're doing

    # Resources
    top                     # Display and update sorted process information
    htop                    # Interactive process viewer
    ps                      # Display current processes
    ps aux                  # Display all processes
    free -h                 # Display memory usage
    df -h                   # Display disk usage
    du -sh directory        # Display directory size
    lsof                    # List open files

---

Network
    # Connectivity
    ping host               # Ping host
    traceroute host         # Trace route to host
    dig domain              # DNS lookup
    nslookup domain         # DNS lookup
    whois domain            # Domain information
    ifconfig                # Network interface configuration
    ip addr                 # IP address information
    netstat -tuln           # List open ports
    ss -tuln                # List open ports (newer alternative)
    curl url                # Transfer data from/to server
    wget url                # Download files from web
    ssh user@host           # Secure shell connection
    scp file user@host:path # Secure copy

---

Process Management
    # Process Control
    ps                      # List processes
    ps aux                  # List all processes
    pgrep pattern           # Find process ID by name pattern
    kill PID                # Kill process by ID
    killall process         # Kill process by name
    pkill pattern           # Kill process by pattern
    bg                      # Send process to background
    fg                      # Bring process to foreground
    jobs                    # List background jobs
    nohup command &         # Run command immune to hangups

---

File Compression
# Archives
    tar -cvf archive.tar files     # Create tar archive
    tar -xvf archive.tar           # Extract tar archive
    tar -czvf archive.tar.gz files # Create compressed tar archive
    tar -xzvf archive.tar.gz       # Extract compressed tar archive
    gzip file                      # Compress file with gzip
    gunzip file.gz                 # Decompress gzip file
    zip archive.zip files          # Create zip archive
    unzip archive.zip              # Extract zip archive

---

Bash Scripting
    # Variables and Control
    var="value"             # Assign variable
    echo $var               # Print variable
    echo ${var}             # Print variable (safer)
    $1, $2, ...             # Command line arguments
    $#                      # Number of arguments
    $0                      # Script name
    $?                      # Exit status of last command
    if [ condition ]; then  # If statement
    commands
    elif [ condition ]; then
    commands
    else
    commands
    fi

    for i in {1..5}; do     # For loop
    commands
    done

    while [ condition ]; do # While loop
    commands
    done

    case $var in            # Case statement
    pattern1) commands ;;
    pattern2) commands ;;
    *) default commands ;;
    esac

---

Input/Output Redirection
    command > file          # Redirect stdout to file (overwrite)
    command >> file         # Redirect stdout to file (append)
    command < file          # Redirect stdin from file
    command 2> file         # Redirect stderr to file
    command &> file         # Redirect both stdout and stderr
    command1 | command2     # Pipe output of command1 to command2
    command1 && command2    # Run command2 if command1 succeeds
    command1 || command2    # Run command2 if command1 fails

---

User Management
# Users and Groups
    sudo command            # Execute command as superuser
    su - username           # Switch user
    passwd                  # Change password
    useradd username        # Add user
    userdel username        # Delete user
    groupadd groupname      # Add group
    groupdel groupname      # Delete group
    usermod -aG group user  # Add user to group

---

System Services
# Service Management (systemd)
    systemctl start service    # Start service
    systemctl stop service     # Stop service
    systemctl restart service  # Restart service
    systemctl status service   # Check service status
    systemctl enable service   # Enable service at boot
    systemctl disable service  # Disable service at boot

# Service Management (init.d)
    service service_name start    # Start service
    service service_name stop     # Stop service
    service service_name restart  # Restart service
    service service_name status   # Check service status

---

Miscellaneous
    # Useful Commands
    history                 # Command history
    clear                   # Clear terminal
    alias name='command'    # Create command alias
    unalias name            # Remove alias
    crontab -e              # Edit scheduled tasks
    find /path -name "pattern" # Find files by name
    find /path -type f -size +10M # Find files larger than 10MB
    xargs                   # Build and execute commands from standard input
    tee                     # Read from stdin and write to stdout and files

